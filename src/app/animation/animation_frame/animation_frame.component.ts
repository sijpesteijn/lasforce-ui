import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { AnimationService } from '../animation.service';
import { Animation } from '../animation';
import {
    DashboardEventService, DashboardEvent, ANIMATION_FRAME_SELECTED, ANIMATION_NEXT_FRAME,
    ANIMATION_LAST_FRAME, ANIMATION_FIRST_FRAME, ANIMATION_PREV_FRAME,
    ANIMATION_FRAME_OBJECT_SELECTED, ANIMATION_FRAME_OBJECT_DESELECTED
} from '../../dashboard/dashboard.service';
import { PaperAnimationService, PaperAnimation } from '../paper_animation.service';
import * as paper from 'paper';

@Component({
    selector: 'animation_frame',
    template: require('./animation_frame.html'),
    styles  : [require('./animation_frame.scss')]
})
export class AnimationFrameComponent {
    private animation: PaperAnimation;
    private nodes: any[] = [];
    private config       = {
        allowDrag: true,
        allowDrop: true
    };
    sharedService: PaperAnimationService;

    constructor(private events: DashboardEventService) {
    }

    ngAfterViewInit() {
        this.sharedService.getAnimation().subscribe((animation : PaperAnimation) => {
            if (animation.layers.length > 0) {
                this.animation = animation;
                this.loadObjects(0);
            }
        });
        this.events.subscribe(event => {
            if (event.key === ANIMATION_FRAME_SELECTED) {
                this.loadObjects(event.value);
            }
        });
    }

    onEvent(event) {
        if (event.eventName === 'onActivate') {
            if (event.node.data.paper.type === 'path') {
                event.node.data.paper.fullySelected = true;
            } else {
                event.node.data.paper.selected = true;
            }
        } else if (event.eventName === 'onDeactivate') {
            if (event.node.data.paper.type === 'path') {
                event.node.data.paper.fullySelected = false;
            } else {
                event.node.data.paper.selected = false;
            }
        }
    }

    private loadObjects(frameNr: number) {
        this.nodes = [];
        if (this.animation.layers.length > 0) {
            let frame = this.animation.layers[frameNr];
            frame.children.forEach(path => {
                let segm = {
                    name    : path.type,
                    uid     : path.uid,
                    children: [],
                    paper : path
                };
                this.nodes.push(segm);
                path.segments.forEach(segment => {
                    segm.children.push({
                        name       : 'Point (' + segment.name + ')',
                        uid        : segment.uid,
                        hasChildren: false,
                        paper: segment
                    });
                });
            });
        }
    }
}