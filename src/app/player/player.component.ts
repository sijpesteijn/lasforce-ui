import { Component } from '@angular/core';
import {
    DashboardEventService, DashboardEvent, ANIMATION_NEXT_FRAME, ANIMATION_PREV_FRAME,
    ANIMATION_LAST_FRAME, ANIMATION_FIRST_FRAME
} from '../dashboard/dashboard.service';

@Component({
    selector: 'player-controls',
    template: require('./player.html')
})
export class PlayerComponent {
    private intervalSubscription = undefined;
    constructor(private events: DashboardEventService) {}

    nextFrame() {
        this.events.emit(new DashboardEvent(ANIMATION_NEXT_FRAME));
    }

    lastFrame() {
        this.events.emit(new DashboardEvent(ANIMATION_LAST_FRAME));
    }

    prevFrame() {
        this.events.emit(new DashboardEvent(ANIMATION_PREV_FRAME));
    }

    firstFrame() {
        this.events.emit(new DashboardEvent(ANIMATION_FIRST_FRAME));
    }

    play() {
        this.intervalSubscription = setInterval(() => {
            this.events.emit(new DashboardEvent(ANIMATION_NEXT_FRAME));
        }, 500);
    }

    stop() {
        clearInterval(this.intervalSubscription);
        this.intervalSubscription = undefined;
    }
}