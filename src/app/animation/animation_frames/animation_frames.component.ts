import { Component, ViewChild, ElementRef } from '@angular/core';
import { AnimationService } from '../animation.service';
import { Animation } from '../animation';
import {
    DashboardEventService, DashboardEvent, ANIMATION_FRAME_SELECTED, ANIMATION_NEXT_FRAME,
    ANIMATION_LAST_FRAME, ANIMATION_FIRST_FRAME, ANIMATION_PREV_FRAME
} from '../../dashboard/dashboard.service';

@Component({
    selector: 'animation_frames',
    template: require('./animation_frames.html'),
    styles: [require('./animation_frames.scss')]
})
export class AnimationFramesComponent {
    private animation: Animation;

    constructor(private animationService: AnimationService,
                private events: DashboardEventService) {}

    ngOnInit() {
        this.animationService.getAnimation().subscribe(animation => {
            if(animation !== undefined && animation.id !== 0) {
                this.animation = animation;
                this.animation.current_frame = 0;
                this.events.emit(new DashboardEvent(ANIMATION_FRAME_SELECTED, 0));
            }
        });
        this.events.subscribe(event => {
            if (event.key === ANIMATION_NEXT_FRAME) {
                let curr = this.animation.current_frame;
                if (curr < this.animation.frames.length - 1) {
                    curr++;
                } else {
                    curr = 0;
                }
                this.animation.current_frame = curr;
                this.events.emit(new DashboardEvent(ANIMATION_FRAME_SELECTED, curr));
            }
            if (event.key === ANIMATION_PREV_FRAME) {
                let curr = this.animation.current_frame;
                if (curr > 0) {
                    curr--;
                } else {
                    curr = this.animation.total_frames - 1;
                }
                this.animation.current_frame = curr;
                this.events.emit(new DashboardEvent(ANIMATION_FRAME_SELECTED, curr));
            }
            if (event.key === ANIMATION_LAST_FRAME) {
                this.animation.current_frame = this.animation.total_frames - 1;
                this.events.emit(new DashboardEvent(ANIMATION_FRAME_SELECTED, this.animation.current_frame));
            }
            if (event.key === ANIMATION_FIRST_FRAME) {
                this.animation.current_frame = 0;
                this.events.emit(new DashboardEvent(ANIMATION_FRAME_SELECTED, this.animation.current_frame));
            }
        });
    }

    loadFrame(frameNumber: number) {
        this.animation.current_frame = frameNumber;
        this.events.emit(new DashboardEvent(ANIMATION_FRAME_SELECTED, frameNumber));
    }
}