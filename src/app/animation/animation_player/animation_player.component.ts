
import { Component } from '@angular/core';
import {
    ANIMATION_LOADED, ANIMATION_SPEED, DashboardEvent, DashboardEventService, ZOOM_LEVEL
} from '../../dashboard/dashboard.service';
import { Animation } from '../animation';
@Component({
    selector: 'animation_player',
    template: require('./animation_player.html'),
    styles: [require('./animation_player.scss')]
})
export class AnimationPlayerComponent {
    private zoom: number = 0;
    private animation: Animation;
    private speed: number = 1;

    constructor(private events: DashboardEventService) {}

    ngAfterViewInit() {
        this.events.subscribe(event => {
            if (event.key === ANIMATION_LOADED) {
                this.animation = event.value;
                if (!this.animation.frame_time) {
                    this.animation.frame_time = 1000;
                }
                this.speed = 1000 / this.animation.frame_time;
            }
            if (event.key === ZOOM_LEVEL) {
                this.zoom = event.value;
            }
        })
    }

    setSpeed(event) {
        if (this.animation) {
            console.log('E ', parseInt(event)/1000);
            this.animation.frame_time = parseInt(event)/1000;
            this.speed = 1000 / this.animation.frame_time;
            this.events.emit(new DashboardEvent(ANIMATION_SPEED, this.animation.frame_time));
        }
    }

    setFramesPerSecond(framesPerSecond) {
        console.log(framesPerSecond);
        this.animation.frame_time = framesPerSecond * 1000;
    }

    getFramesPerSecond(): number {
        if (!this.animation)
            return 1;
        return Math.round(1000/this.animation.frame_time * 10) / 10;
    }

    private setZoom(zoom: number) {
        this.zoom = zoom / 100;
        this.events.emit(new DashboardEvent(ZOOM_LEVEL, this.zoom));
    }
}