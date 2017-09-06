import { Component } from '@angular/core';
import {
    DashboardEventService, ANIMATION_FRAME_SELECTED,
} from '../../dashboard/dashboard.service';
import { PaperAnimationService, PaperAnimation } from '../paper_animation.service';

@Component({
    selector: 'animation_frame_details',
    template: require('./animation_frame_details.html'),
    styles  : [require('./animation_frame_details.scss')]
})
export class AnimationFrameDetailsComponent {
    private paperAnimation: PaperAnimation;
    private nodes: any[] = [];
    private config       = {
        allowDrag: true,
        allowDrop: true
    };
    sharedService: PaperAnimationService;

    constructor(private events: DashboardEventService) {
    }

    ngAfterViewInit() {
        this.sharedService.getPaperAnimation().subscribe((paperAnimation : PaperAnimation) => {
            if (paperAnimation.layers.length > 0) {
                this.paperAnimation = paperAnimation;
                this.loadObjects(0);
            }
        });
        this.events.subscribe(event => {
            if (event.key === ANIMATION_FRAME_SELECTED) {
                this.loadObjects(event.value);
            }
        });
    }

    handleEvent(event) {
        console.log('Handle event');
        if (event.node.data.paper.type === 'path') {
            event.node.data.paper.fullySelected = true;
        } else {
            event.node.data.paper.selected = true;
        }
    }

    onActiveChanged(event) {
        this.handleEvent(event);
    }

    onFocus(event) {
        this.handleEvent(event);
    }

    onBlur(event) {
        this.handleEvent(event);
    }

    onActivate(event) {
        this.handleEvent(event);
    }

    onDeactivate(event) {
        this.handleEvent(event);
    }

    private loadObjects(frameNr: number) {
        this.nodes = [];
        if (this.paperAnimation.layers.length > 0) {
            let frame = this.paperAnimation.layers[frameNr];
            frame.children.forEach(path => {
                let segm = {
                    name    : (path.data.name !== undefined && path.data.name !== '') ? path.data.name : 'No name',
                    id     : path.id,
                    children: [],
                    paper : path
                };
                this.nodes.push(segm);
                (path as any).segments.forEach(segment => {
                    segm.children.push({
                        name       : 'P('+ segment.point.x + 'x' + segment.point.y +')',
                        id        : segment.id,
                        hasChildren: false,
                        paper: segment
                    });
                });
            });
        }
    }
}