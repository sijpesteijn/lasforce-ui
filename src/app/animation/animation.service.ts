import { Http } from '@angular/http';
import { SettingsService } from '../settings.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Animation } from './animation';

@Injectable()
export class AnimationService {
    animation: Subject<Animation>;

    constructor(private http: Http, private settings: SettingsService) {
        this.animation = new BehaviorSubject<Animation>(new Animation());
    }

    getAnimation(): Observable<Animation> {
        return this.animation;
    }


    public getAnimations(): Observable<Animation[]> {
        return this.settings.get('animation.all').concatMap(url => {
            return (this.http.get(url, {}) as any)
                .map(response => response.json());
        });
    }

    public getAnimationById(id: number): Observable<Animation> {
        return this.settings.get('animation.get').concatMap(url => {
            return (this.http.get(url.replace(':id', id), {}) as any)
                .map(response => {
                    let result = response.json();
                    this.animation.next(result);
                    return result;
                });
        });
    }

}