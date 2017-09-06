import { Component, ViewChild, HostListener, animate } from '@angular/core';
import {
    DashboardEventService, ANIMATION_FRAME_SELECTED, LOAD_ANIMATION, DashboardEvent,
    PLAYER_BUTTON_FIRST, PLAYER_BUTTON_LAST, PLAYER_BUTTON_PREV, PLAYER_BUTON_NEXT,
    MOUSE_CURSOR_EVENT, ANIMATION_SPEED, ANIMATION_LOADED, ZOOM_LEVEL
} from '../../dashboard/dashboard.service';
import { AnimationService } from '../animation.service';
import { Animation, Frame } from '../animation';
import * as paper from 'paper';
import { PaperAnimationService, PaperAnimation } from '../paper_animation.service';
import { ToolHandler } from './tool_handler.component';
import { HistoryService } from '../../history/history.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'animation_canvas',
    template: require('./animation_canvas.html'),
    styles  : [require('./animation_canvas.scss')]
})
export class AnimationCanvasComponent {
    @ViewChild('animation')
    private canvas: any;
    private status: string           = 'loaded';
    private toolHandler: ToolHandler;
    // private sharedService: PaperAnimationService;
    private animation: Animation;
    // private paperAni: PaperAnimation = {
    //     layers: []
    // };
    // private zoom: number             = 1;

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: any) {
        if (this.animation && this.toolHandler) {
            this.toolHandler.onMouseDownCanvas(event);
        }
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: any) {
        if (this.animation && this.toolHandler) {
            this.toolHandler.onMouseUpCanvas(event);
        }
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: any) {
        if (this.animation && this.toolHandler) {
            this.toolHandler.onMouseMoveCanvas(event);
        }
    }

    @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
        this.mouseWheelFunc(event);
    }

    @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
        this.mouseWheelFunc(event);
    }

    @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
        this.mouseWheelFunc(event);
    }

    mouseWheelFunc(evnt: any) {
        let event = window.event || evnt; // old IE support
        if (event.altKey === true) {
            let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            if (delta > 0) {
                this.zoomUp();
            } else if (delta < 0) {
                this.zoomDown();
            }
            // this.zoom         = paper.view.zoom;
            // for IE
            event.returnValue = false;
            // for Chrome and Firefox
            if (event.preventDefault) {
                event.preventDefault();
            }
        } else if (event.shiftKey === true) {
            let orgCenter = paper.view.center;
            console.log(orgCenter);
            // paper.view.center = new paper.Point(orgCenter.x + evnt.deltaX, orgCenter.y - evnt.deltaY);
        }
    }

    constructor(private events: DashboardEventService,
                public route: ActivatedRoute,
                public router: Router,
                private animationService: AnimationService,
                private historyService: HistoryService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(p => {
                if (p['id']) {
                    console.log('Getting animation with id: ', p['id']);
                    this.animationService.getAnimationById(p['id']).subscribe(animation => {
                        this.loadAnimation(animation);
                    });
                }
                // console.log(this.route);
            });
        this.events.subscribe(event => {
            if (event.key === ANIMATION_FRAME_SELECTED) {
                this.switchLayers(this.animation.current_frame, event.value);
            } else if (event.key === PLAYER_BUTON_NEXT) {
                let currentFrame = this.animation.current_frame;
                let newFrame     = 0;
                if (currentFrame < this.animation.frames.length - 1) {
                    newFrame = currentFrame + 1;
                }
                this.switchLayers(currentFrame, newFrame);
            } else if (event.key === PLAYER_BUTTON_PREV) {
                let currentFrame = this.animation.current_frame;
                let newFrame     = this.animation.total_frames - 1;
                if (currentFrame > 0) {
                    newFrame = currentFrame - 1;
                }
                this.switchLayers(currentFrame, newFrame);
            } else if (event.key === PLAYER_BUTTON_LAST) {
                this.switchLayers(this.animation.current_frame, this.animation.total_frames - 1);
            } else if (event.key === PLAYER_BUTTON_FIRST) {
                this.switchLayers(this.animation.current_frame, 0);
            } else if (event.key === ANIMATION_SPEED) {
                if (this.animation) {
                    this.animation.frame_time = event.value;
                    this.animationService.saveAnimation(this.animation).debounce(() =>
                        Observable.interval(700)).subscribe(result => {});
                }

            }
        });
        // this.animationService.getAnimation().subscribe(animation => {
        //     if (animation !== undefined) {
        //         this.loadAnimation(animation);
        //         // this.events.emit(new DashboardEvent(ANIMATION_LOADED, animation));
        //     }
        // });
    }

    ngAfterViewInit() {
        paper.install(window);
        paper.setup(this.canvas.nativeElement);

        this.events.subscribe(event => {
            if (event.key === 'selectTool') {
                paper.project.activeLayer.selected = false;
                this.setToolHandler(event.value);
            } else if (event.key === LOAD_ANIMATION) {
                this.status = 'loading';
            } else if (event.key === ZOOM_LEVEL) {
                paper.view.zoom = event.value;
            }
        });
    }

    private loadAnimation(animation: Animation) {
        let start = performance.now();
        console.log('Loading animation: ', animation);
        paper.project.clear();
        this.events.emit(new DashboardEvent(ZOOM_LEVEL, 1));
        this.animation = animation;
        this.animation.frames.forEach(frame => {
            // this.paperAni.layers.push(this.createLayer(frame));
            this.createLayer(frame);
        });
        paper.project.layers[this.animation.current_frame].activate();
        paper.project.layers[this.animation.current_frame].visible = true;
        // this.paperAni.layers[this.animation.current_frame].visible = true;
        // this.sharedService.setPaperAnimation(this.paperAni);
        this.status = 'loaded';
        paper.project.view.update();
        console.log('Took ', performance.now() - start );
    }

    createLayer(frame: Frame): paper.Layer {
        let layer = new paper.Layer();
        let that  = this;
        layer.activate();
        layer.visible = false;
        layer.data.id = frame.id;
        frame.paths.forEach(segment => {
            let path: paper.Path = new paper.Path();
            let color: number[]  = segment.color;
            segment.coordinates.forEach(coordinate => {
                let point = new paper.Point(this.convertUpCoordinate(coordinate[0]), this.convertUpCoordinate(coordinate[1]));
                path.add(point);
            });
            // path.data.id = segment.id;
            path.strokeColor = new paper.Color(color[0], color[1], color[2]);
            path.strokeWidth = 1;
            path.strokeCap   = 'square';

            path.closed      = segment.closed;
            path.onMouseMove = function (event: any) {
                that.toolHandler.onMouseMovePaperObject(event);
            };
        });
        return layer;
    }

    private setToolHandler(toolHandler: ToolHandler) {
        this.toolHandler = toolHandler;
        this.toolHandler.itemAdded().subscribe((path: paper.Path) => {
            if (path) {
                let colorStr = (path.strokeColor as any).toCSS(false).split(',');
                let newPath      = {
                    closed     : path.closed,
                    color      : [
                        Number(colorStr[0].substring(4)),
                        Number(colorStr[1]),
                        Number(colorStr[2].substring(0, colorStr[2].length - 1))],
                    coordinates: []
                };
                path.segments.forEach(segment => {
                    let coordinate: number[] = [];
                    coordinate.push(this.convertDownCoordinate(segment.point.x));
                    coordinate.push(this.convertDownCoordinate(segment.point.y));
                    newPath.coordinates.push(coordinate);
                });
                this.animation.frames[0].paths.push(newPath);
                // this.animationService.saveAnimation(this.animation).subscribe();
            }
        });
        this.toolHandler.itemUpdated().subscribe((path: paper.Path) => {
           if (path) {
               console.log('Updated ', path);
               console.log('Active ', paper.project.activeLayer.children);
           }
        });
    }

    convertUpCoordinate(nr: number): number {
        return (nr + 32768) / 100;
    }

    convertDownCoordinate(nr: number): number {
        return (nr * 100) - 32768;
    }

    private zoomDown(): void {
        if (paper.view.zoom > 0.4) {
            paper.view.zoom = paper.view.zoom - 0.1;
        }
    }

    private zoomUp() {
        if (paper.view.zoom < 4) {
            paper.view.zoom = paper.view.zoom + 0.1;
        }
    }

    private switchLayers(currentFrame: number, newFrame: number) {
        console.log(paper.project);
        paper.project.layers[newFrame].visible     = true;
        (paper.project as any)._activeLayer = paper.project.layers[newFrame];
        paper.project.layers[currentFrame].visible     = false;
        paper.project.activeLayer.activate();
        paper.project.activeLayer.visible = true;
        this.animation.current_frame = newFrame;
        paper.view.update();
        // console.log(paper.project.activeLayer);
    }
}
