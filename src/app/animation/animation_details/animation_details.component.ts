import { Component } from '@angular/core';
import {
    DashboardEventService
} from '../../dashboard/dashboard.service';
import { AnimationService } from '../animation.service';
import { Animation } from '../animation';
import { Router } from '@angular/router';

@Component({
    selector: 'animation_details',
    template: require('./animation_details.html'),
    styles  : [require('./animation_details.scss')]
})
export class AnimationDetailsComponent {
    private animation: Animation;

    constructor(private router: Router,
                private animationService: AnimationService) {
    }

    ngAfterViewInit() {
        this.animationService.getAnimation().subscribe((animation : Animation) => {
            this.animation = animation;
        });
    }

    private removeAnimation(animation: Animation) {
        this.animationService.removeAnimation(animation).subscribe(() => this.router.navigate(['/animations/animation_edit/']));
    }

    private updateAnimation(event: any) {
        this.animation[event.field]=event.value;
        this.animationService.saveAnimation(this.animation).subscribe();
    }
}