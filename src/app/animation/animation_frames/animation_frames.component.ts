import { Component } from '@angular/core';
import { AnimationService } from '../animation.service';
import { Animation, Frame } from '../animation';
import {
    DashboardEventService, DashboardEvent, ANIMATION_FRAME_SELECTED
} from '../../dashboard/dashboard.service';
import { HistoryService } from '../../history/history.service';

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
            this.animation = animation;
        });
    }

    updateAnimation() {
        this.animationService.saveAnimation(this.animation).subscribe();
    }

    loadFrame(frameNumber: number) {
        this.events.emit(new DashboardEvent(ANIMATION_FRAME_SELECTED, frameNumber));
    }

    removeFrame(frame: Frame) {
        let index = this.animation.frames.indexOf(frame);
        this.animation.frames = this.animation.frames.filter(frm => frm.id !== frame.id);
        if (this.animation.frames.length === 0) {
            this.animation.current_frame = 0;
        } else if (this.animation.frames.length - 1 === index) {
            this.animation.current_frame = this.animation.frames.length - 1;
        } else {
            this.animation.current_frame = index - 1;
        }
        if (this.animation.frames.length === 0) {
            let frame: Frame = {
                id         : 1,
                repeat     : 1,
                name       : 'Frame',
                total_paths: 0,
                paths      : []
            };
            this.animation.frames.push(frame);
        }
        this.animation.total_frames = this.animation.frames.length;
        this.animationService.saveAnimation(this.animation).subscribe();
    }

    updateFrame(frame: Frame, event: any) {
        frame[event.field] = event.value;
        this.animationService.saveAnimation(this.animation).subscribe();
    }
}