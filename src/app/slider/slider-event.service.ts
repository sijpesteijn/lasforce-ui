import { Injectable, EventEmitter } from '@angular/core';
import { SliderBarComponent } from './slider-bar/slider-bar.component';

export const MOUSE_CURSOR_EVENT = 'mouseCursorEvent';

export class SliderEvent {
    constructor(public key: string, public value?: any) {}
}

@Injectable()
export class SliderEventService {

    private events: EventEmitter<SliderEvent> = new EventEmitter<SliderEvent>();

    emit(event: SliderEvent) {
        this.events.emit(event);
    }

    subscribe(callback) {
        return this.events.subscribe(callback);
    }

    takeUntil(callback) {
        return this.events.takeUntil(callback);
    }

}
