import { Http, RequestOptions, Headers } from '@angular/http';
import { SettingsService } from '../settings.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Show } from './index';

@Injectable()
export class ShowService {
    show: Subject<Show>;

    constructor(private http: Http, private settings: SettingsService) {
        this.show = new BehaviorSubject<Show>(new Show());
    }

    getShow(): Observable<Show> {
        return this.show;
    }


    public getShows(): Observable<Show[]> {
        return this.settings.get('show.all').concatMap(url => {
            return (this.http.get(url, {}) as any)
                .map(response => response.json());
        });
    }

    public getShowById(id: number): Observable<Show> {
        return this.settings.get('show.get').concatMap(url => {
            return (this.http.get(url.replace(':id', id), {}) as any)
                .map(response => {
                    let result = response.json();
                    this.show.next(result);
                    return result;
                });
        });
    }

    saveShow(show: Show): Observable<Show> {
        return this.settings.get('show.save').concatMap(url => {
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            return (this.http.post(url, JSON.stringify(show), options) as any).map(response => {
                // let result = response.json();
                // this.show.next(result); // TODO correct antwoord van be
                // return result;
                this.show.next(show);
                return show;
            });
        });
    }
}