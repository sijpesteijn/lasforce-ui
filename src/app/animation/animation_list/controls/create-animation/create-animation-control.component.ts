import { Component } from '@angular/core';
import { Animation, Frame } from '../../../animation';
import { AnimationService } from '../../../animation.service';
import { Router } from '@angular/router';

@Component({
    selector: 'create-animation',
    template: require('./create-animation-control.html')
})
export class CreateAnimationControl {
    private animation: Animation;

    constructor(private animationService: AnimationService,
                private router: Router) {
    }

    ngAfterViewInit() {
        this.animationService.getAnimation().subscribe(animation => {
            if (this.animation !== undefined)
                this.animation = animation;
        });
    }

    newAnimation(clone: boolean) {
        let animation = new Animation();
        if (clone) {
            animation.id            = new Date().getTime();
            animation.name          = this.animation.name;
            animation.repeat        = this.animation.repeat;
            animation.last_update   = 0;
            animation.current_frame = 0;
            animation.frame_time    = animation.frame_time;
            animation.total_frames  = animation.total_frames;
            this.animation.frames.forEach(frame => {
                this.cloneCurrentObjects(frame);
                animation.frames.push(frame);
            });
        } else {
            animation.id            = new Date().getTime();
            animation.name          = 'New Animation';
            animation.repeat        = 1;
            animation.last_update   = 0;
            animation.current_frame = 0;
            animation.frame_time    = 1000;
            animation.total_frames  = 1;
            animation.frames        = [];
            let frame: Frame        = {
                id         : 1,
                repeat     : 1,
                name       : 'Frame',
                total_paths: 0,
                paths      : []
            };
            animation.frames.push(frame);
        }
        this.animationService.saveAnimation(animation).subscribe(() => this.router.navigate(['/animations/animation_edit/'], { queryParams: { id: animation.id } }));
    }

    private cloneCurrentObjects(frame: Frame): Frame {
        let segments = [];
        return {
            id         : frame.id,
            repeat     : frame.repeat,
            name       : frame.name,
            total_paths: frame.total_paths,
            paths      : []
        }
    }

    convertDownCoordinate(nr: number): number {
        return (nr * 100) - 32768;
    }
}