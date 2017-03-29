import { Component, ViewChild, HostListener } from '@angular/core';
import {
    DashboardEventService, ANIMATION_FRAME_SELECTED, LOAD_ANIMATION
} from '../../dashboard/dashboard.service';
import { AnimationService } from '../animation.service';
import { Animation, Frame } from '../animation';
import * as paper from 'paper';
import { PaperAnimationService, PaperAnimation } from '../paper_animation.service';

@Component({
    selector: 'animation_canvas',
    template: require('./animation_canvas.html'),
    styles  : [require('./animation_canvas.scss')]
})
export class AnimationCanvasComponent {
    @ViewChild('animation')
    private canvas: any;
    private status: string = 'loaded';
    private layer: paper.Layer;
    private selectedSegment: paper.Segment;
    private selectedPath: paper.Path;
    private sharedService: PaperAnimationService;
    private mouseDown: boolean = false;
    private animation: Animation;
    private hitOptions     = {
        segments: true,
        stroke: true,
        fill: false,
        tolerance: 5
    };

    @HostListener('mousedown', ['$event'])
    onMousedown(event: any) {
        this.mouseDown = true;
        let point = new paper.Point(event.offsetX, event.offsetY);
        let hitResult = paper.project.hitTest(point, this.hitOptions);
        paper.project.activeLayer.selected = false;
        if (hitResult && hitResult.item)
            hitResult.item.selected = true;
        if (event.shiftKey === true) {
            if (hitResult.type == 'segment') {
                hitResult.segment.remove();
            }
            return;
        }

        if (hitResult) {
            this.selectedPath = hitResult.item as paper.Path;
            if (hitResult.type == 'segment') {
                this.selectedSegment = hitResult.segment;
            } else if (hitResult.type == 'stroke') {
                let location = hitResult.location;
                this.selectedSegment      = this.selectedPath.insert(location.index + 1, point);
                // path.smooth();
            }
            hitResult.item.bringToFront();
        }
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: any) {
        this.mouseDown = false;
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: any) {
        if (this.mouseDown === true) {
            let point = new paper.Point(event.offsetX, event.offsetY);
            if (this.selectedSegment) {
                this.selectedSegment.point = point;
                this.selectedPath.smooth();
            } else if (this.selectedPath) {
                this.selectedPath.position = point;
            }
        }
    }



    constructor(private events: DashboardEventService, private animationService: AnimationService) {
    }

    ngAfterViewInit() {
        paper.install(window);
        paper.setup(this.canvas.nativeElement);
        this.animationService.getAnimation().subscribe(animation => {
            if (animation.id !== 0)
                this.loadAnimation(animation);
        });

        this.events.subscribe(event => {
            if (event.key === 'selectTool') {
                console.log('Tool: ', event.value);
            }
            if (event.key === ANIMATION_FRAME_SELECTED) {
                paper.project.activeLayer.visible         = false;
                paper.project.layers[event.value].visible = true;
                paper.project.layers[event.value].activate();
                paper.project.view.update();
            }
            if (event.key === LOAD_ANIMATION) {
                this.status = 'loading';
            }
        });
    }

    private loadAnimation(animation: Animation) {
        paper.project.clear();
        paper.project.view.update();
        this.animation               = animation;
        let paperAni: PaperAnimation = {
            layers: []
        };
        this.animation.frames.forEach(frame => {
            // paperAni.layers.push(this.createLayer(frame));
        });
        this.createPaths();
        // paperAni.layers[0].visible = true;
        this.sharedService.setAnimation(paperAni);
        this.status = 'loaded';
        // paper.project.view.update();
    }

    private values = {
        paths    : 50,
        minPoints: 5,
        maxPoints: 15,
        minRadius: 30,
        maxRadius: 90
    };

    createPaths() {
        let center = new paper.Point(600, 600);
        let layer  = new paper.Layer();
        layer.activate();
        let radiusDelta = this.values.maxRadius - this.values.minRadius;
        let pointsDelta = this.values.maxPoints - this.values.minPoints;
        for (let i = 0; i < this.values.paths; i++) {
            let radius       = this.values.minRadius + Math.random() * radiusDelta;
            let points       = this.values.minPoints + Math.floor(Math.random() * pointsDelta);
            let random       = paper.Point.random();
            let randomCenter = new paper.Point(center.x * random.x, center.y * random.y);
            console.log('Random ', radius);
            let path         = this.createBlob(randomCenter, radius, points);
            let lightness    = (Math.random() - 0.5) * 0.4 + 0.4;
            let hue          = Math.random() * 360;
            // path.fillColor   = '#dddddd'; // { hue: hue, saturation: 1, lightness: lightness };
            path.strokeColor = 'red';
        }
        console.log(paper.project.activeLayer);
    }

    createBlob(center, maxRadius, points): paper.Path {
        console.log('Blob', center);
        let path    = new paper.Path();
        // path.onMouseEnter = function(event) {
        //     console.log('Me ', event);
        //     event.target.selected = true;
        // };
        path.onMouseMove = function(event) {
            paper.project.activeLayer.selected = false;
            if (event.target)
                event.target.selected = true;
        };
        path.closed = true;
        for (let i = 0; i < points; i++) {
            let delta = new paper.Point({
                length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
                angle : (360 / points) * i
            });
            path.add(new paper.Point(delta.x + center.x, delta.y + center.y));
        }
        path.smooth();
        return path;
    }

    createLaayer(frame: Frame): paper.Layer {
        let layer = new paper.Layer();
        layer.activate();
        layer.visible      = false;
        let path, segment;
        layer.onMouseMove  = function (event) {
            path = segment = undefined;
            // console.log('Move event', event.event.buttons);
            let hitResult                      = project.hitTest(event.point, this.hitOptions);
            paper.project.activeLayer.selected = false;
            if (hitResult && hitResult.item)
                hitResult.item.selected = true;
        };
        layer.onMouseDown  = function (event) {
            // console.log('Down event');
            let hitResult                      = project.hitTest(event.point, this.hitOptions);
            paper.project.activeLayer.selected = false;
            if (hitResult && hitResult.item)
                hitResult.item.selected = true;
            console.log('hr ', hitResult);
            if (event.modifiers.shift) {
                if (hitResult.type == 'segment') {
                    hitResult.segment.remove();
                }
                return;
            }

            if (hitResult) {
                path = hitResult.item;
                if (hitResult.type == 'segment') {
                    segment = hitResult.segment;
                } else if (hitResult.type == 'stroke') {
                    let location = hitResult.location;
                    segment      = path.insert(location.index + 1, event.point);
                    // path.smooth();
                }
                hitResult.item.bringToFront();
            }
        };
        layer.onMouseDown  = function (event) {
            // console.log('Drag event');
            if (segment) {
                segment.point += event.delta;
                // path.smooth();
            } else if (path) {
                path.position += event.delta;
            }

        };
        layer.onMouseEnter = function (event) {
            // console.log('Enter event ', event.event.target);
        };
        layer.onMouseLeave = function (event) {
            // console.log('Leave event ', event.event.target);
        };
        layer.onMouseUp    = function (event) {
            // console.log('Up event ', event.event.target);
        };
        layer.onClick      = function (event) {
            // console.log('Click event ', event.event.target);
        };

        // layer.on('mousedown' | 'mouseup' | 'mousedrag' | 'mousemove' | 'keydown' | 'keyup', (event) => {
        //     console.log('On event ', event.event.target);
        // });
        frame.segments.forEach(segment => {
            let color: number[]  = segment.color;
            let path: paper.Path = new paper.Path();
            path.name            = segment.name;
            path.type            = 'path';
            path.strokeColor     = new paper.Color(color[0], color[1], color[2]);
            path.strokeWidth     = 5;
            path.strokeCap       = 'square';
            path.closed          = true;
            segment.coordinates.forEach(coordinate => {
                let point = new paper.Point(this.convert(coordinate[0]), this.convert(coordinate[1]));
                path.add(point);
            });
        });
        return layer;
    }

    convert(nr: number) {
        return (nr + 32768) / 100;
    }

}
