import { Injectable, EventEmitter } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: InternalStateType = { };

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}

export class AppEvent {
    constructor(private key: string, private value?: any) {}
}

export const TITLE = 'title';
export const LOGOUT = 'logout';

@Injectable()
export class AppEventService {

    private events: EventEmitter<AppEvent> = new EventEmitter<AppEvent>();

    emit(event: AppEvent) {
        this.events.emit(event);
    }

    subscribe(callback) {
        return this.events.subscribe(callback);
    }

    takeUntil(callback) {
        return this.events.takeUntil(callback);
    }

}
