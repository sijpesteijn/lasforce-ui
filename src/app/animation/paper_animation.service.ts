import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import * as paper from 'paper';

export interface PaperAnimation {
    layers: paper.Layer[];
}

@Injectable()
export class PaperAnimationService {
    animationSubject: Subject<PaperAnimation> = new BehaviorSubject<PaperAnimation>({ layers: [] });

    getAnimation(): Observable<PaperAnimation> {
        return this.animationSubject;
    }

    setAnimation(animation: PaperAnimation) {
        this.animationSubject.next(animation);
    }

}