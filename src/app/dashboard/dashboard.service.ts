import { Injectable, EventEmitter } from '@angular/core';

export const LOAD_ANIMATION = 'loadAnimation';
export const ANIMATION_NEXT_FRAME = 'animationNextFrame';
export const ANIMATION_LAST_FRAME = 'animationLastFrame';
export const ANIMATION_PREV_FRAME = 'animationPrevFrame';
export const ANIMATION_FIRST_FRAME = 'animationFirstFrame';
export const ANIMATION_FRAME_SELECTED = 'animationFrameSelected';

export class DashboardEvent {
    constructor(private key: string, private value?: any) {}
}

@Injectable()
export class DashboardEventService {

    private events: EventEmitter<DashboardEvent> = new EventEmitter<DashboardEvent>();

    emit(event: DashboardEvent) {
        this.events.emit(event);
    }

    subscribe(callback) {
        return this.events.subscribe(callback);
    }

    takeUntil(callback) {
        return this.events.takeUntil(callback);
    }

}
