import { Component } from '@angular/core';
import { AnimationService } from '../animation.service';
import { Animation, Frame } from '../animation';

@Component({
    selector: 'animation_list',
    template: require('./animation_list.html'),
    styles: [require('./animation_list.scss')]
})
export class AnimationListComponent {
    private animations: Animation[];
    private selectedAnimation: Animation;

    constructor(private animationService: AnimationService) {
    }

    ngAfterViewInit() {
        this.animationService.getAnimations().subscribe(animations => {
            this.animations = animations;
        });
        this.animationService.getAnimation().subscribe(animation => {
            this.selectedAnimation = animation;
        })
    }

    preview(id: number) {
        this.animationService.getAnimationById(id).subscribe(animation => {});
    }

}