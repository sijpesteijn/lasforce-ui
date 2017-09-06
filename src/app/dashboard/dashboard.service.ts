import { Injectable, EventEmitter } from '@angular/core';

export const MOUSE_CURSOR_EVENT                = 'mouseCursorEvent';
export const ZOOM_LEVEL                        = 'zoomLevel';
export const LOAD_ANIMATION                    = 'loadAnimation';
export const ANIMATION_LOADED                  = 'animationLoaded';
export const ANIMATION_SPEED                   = 'animationSpeed';
export const PLAYER_BUTON_NEXT                 = 'animationNextFrame';
export const PLAYER_BUTTON_LAST                = 'animationLastFrame';
export const PLAYER_BUTTON_PREV                = 'animationPrevFrame';
export const PLAYER_BUTTON_FIRST               = 'animationFirstFrame';
export const ANIMATION_FRAME_SELECTED          = 'animationFrameSelected';
export const ANIMATION_FRAME_OBJECT_SELECTED   = 'animationFrameObjectSelected';
export const ANIMATION_FRAME_OBJECT_DESELECTED = 'animationFrameObjectDeselected';

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
