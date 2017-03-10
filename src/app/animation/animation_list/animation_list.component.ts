import { Component, AfterViewInit } from '@angular/core';
import { AnimationService } from '../animation.service';
import { Animation } from '../animation';
import { AppEventService, AppEvent, TITLE } from '../../app.service';

@Component({
    selector: 'animation_list',
    template: require('./animation_list.html')
})
export class AnimationListComponent implements AfterViewInit {
    private animations: Animation[] = [];
    private status: string = 'loading'

    constructor(private animationService: AnimationService,
                private events: AppEventService) {
    }

    ngAfterViewInit() {
        this.animationService.getAnimations().subscribe(animations => {
            this.animations = animations;
            this.status = 'loaded';
        });
    }

    preview(id: number) {
        this.animationService.getAnimationById(id).subscribe(animation => {
            this.events.emit(new AppEvent(TITLE, animation.name));
        });
    }
}