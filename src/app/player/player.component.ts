import { Component, Input } from '@angular/core';
import {
    DashboardEventService, DashboardEvent, PLAYER_BUTON_NEXT, PLAYER_BUTTON_PREV,
    PLAYER_BUTTON_LAST, PLAYER_BUTTON_FIRST, ANIMATION_SPEED, ANIMATION_LOADED
} from '../dashboard/dashboard.service';

@Component({
    selector: 'player',
    template: require('./player.html')
})
export class PlayerComponent {
    private intervalSubscription = undefined;
    @Input('speed')
    set theSpeed(speed: number) {
        this.speed = speed;
        if (this.playing) {
            this.stop();
            this.play();
        }
    }
    private speed: number = 50;
    private playing: boolean = false;
    constructor(private events: DashboardEventService) {}

    firstFrame() {
        this.events.emit(new DashboardEvent(PLAYER_BUTTON_FIRST));
    }

    prevFrame() {
        this.events.emit(new DashboardEvent(PLAYER_BUTTON_PREV));
    }

    play() {
        this.intervalSubscription = setInterval(() => {
            this.events.emit(new DashboardEvent(PLAYER_BUTON_NEXT));
        }, this.speed);
        this.playing = true;
    }

    stop() {
        clearInterval(this.intervalSubscription);
        this.intervalSubscription = undefined;
        this.playing = false;
    }

    nextFrame() {
        this.events.emit(new DashboardEvent(PLAYER_BUTON_NEXT));
    }

    lastFrame() {
        this.events.emit(new DashboardEvent(PLAYER_BUTTON_LAST));
    }
}