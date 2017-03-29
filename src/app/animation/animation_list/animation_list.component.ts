import { Component, AfterViewInit } from '@angular/core';
import { AnimationService } from '../animation.service';
import { Animation } from '../animation';
import { AppEventService, AppEvent, TITLE } from '../../app.service';
import { PaperAnimationService } from '../paper_animation.service';
import { DashboardEventService, LOAD_ANIMATION } from '../../dashboard/dashboard.service';

@Component({
    selector: 'animation_list',
    template: require('./animation_list.html')
})
export class AnimationListComponent {
    private animations: Animation[] = [];
    private status: string = 'loading';

    constructor(private animationService: AnimationService,
                private dashboardEvents: DashboardEventService,
                private events: AppEventService) {
    }

    ngAfterViewInit() {
        this.animationService.getAnimations().subscribe(animations => {
            this.animations = animations;
            this.status = 'loaded';
        });
    }

    preview(id: number) {
        // this.dashboardEvents.emit(new AppEvent(LOAD_ANIMATION));
        this.animationService.getAnimationById(id).subscribe(animation => {
        });
    }
}