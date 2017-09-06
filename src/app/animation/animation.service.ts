import { Http, RequestOptions, Headers } from '@angular/http';
import { SettingsService } from '../settings.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Animation } from './animation';

@Injectable()
export class AnimationService {
    animation: Subject<Animation>;
    animations: Subject<Animation[]>;
    private animationList: Animation[];

    constructor(private http: Http, private settings: SettingsService) {
        this.animation = new BehaviorSubject<Animation>(undefined);
        this.animations = new BehaviorSubject<Animation[]>(this.animationList);
    }

    getAnimation(): Observable<Animation> {
        return this.animation;
    }

    getAnimations(): Observable<Animation[]> {
        if (this.animationList === undefined) {
            this.loadAnimations().subscribe();
        }
        return this.animations;
    }

    public loadAnimations(): Observable<Animation[]> {
        return this.settings.get('animation.all').concatMap(url => {
            return (this.http.get(url, {}) as any)
                .map(response => {
                    this.animationList = response.json();
                    this.animations.next(this.animationList);
                    return this.animationList;
                });
        });
    }

    public getAnimationById(id: number): Observable<Animation> {
        return this.settings.get('animation.get').concatMap(url => {
            return (this.http.get(url.replace(':id', id), {}) as any)
                .map(response => {
                    let result = response.json();
                    this.animation.next(result);
                    return result;
                }).catch(error => {
                    console.log('Error getting animation with id: ' + id + ' err: ' + error);
                    this.animation.next(undefined);
                    return Observable.throw(error);
                });
        });
    }

    saveAnimation(animation: Animation): Observable<Animation> {
        return this.settings.get('animation.save').concatMap(url => {
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            return (this.http.post(url, JSON.stringify(animation), options) as any).map(response => {
                this.animationList.push(animation);
                this.animations.next(this.animationList);
                this.animation.next(animation);
                return animation;
            });
        });
    }

    removeAnimation(animation: Animation) {
        return this.settings.get('animation.delete').concatMap(url => {
            return (this.http.delete(url.replace(':id', animation.id), {}) as any)
                .map(response => {
                    // let result = response.json();
                    this.animationList = this.animationList.filter(a => a.id !== animation.id);
                    this.animation.next(undefined);
                    this.animations.next(this.animationList);
                    return true;
                });
        });
    }
}