import { Component } from '@angular/core';
import { Animation, Frame } from '../../../animation';
import { AnimationService } from '../../../animation.service';
import * as paper from 'paper';
import { Router } from '@angular/router';
import {
    ANIMATION_FRAME_SELECTED, DashboardEvent, DashboardEventService
} from '../../../../dashboard/dashboard.service';

@Component({
    selector: 'create-frame',
    template: require('./create-frame-control.html')
})
export class CreateFrameControl {
    private animation: Animation;

    constructor(private events: DashboardEventService,
                private animationService: AnimationService) {}

    ngOnInit() {
        this.animationService.getAnimation().subscribe(animation => {
            if(animation !== undefined) {
                this.animation = animation;
            }
        });
    }

    private newFrame(clone: boolean) {
        let title = this.animation.frames[this.animation.current_frame].name;
        let frame = {
            id: this.animation.frames.length + 1,
            repeat: 1,
            name: title,
            total_paths: 0,
            paths: []
        };
        this.animation.current_frame = frame.id - 1;
        this.animation.frames.push(frame);
        this.animation.total_frames = this.animation.frames.length;
        if (clone) {
            this.cloneCurrentObjects(frame)
        }
        this.animationService.saveAnimation(this.animation).subscribe(() => {
            this.events.emit(new DashboardEvent(ANIMATION_FRAME_SELECTED, this.animation.current_frame));
        });
    }

    private cloneCurrentObjects(frame: Frame) {
        let children = paper.project.activeLayer.children;
        children.forEach(child => {
            let colorStr = (child.strokeColor as any).toCSS(false).split(',');
            let seg = {
                closed     : (child as paper.Path).closed,
                color      : [
                    Number(colorStr[0].substring(4)),
                    Number(colorStr[1]),
                    Number(colorStr[2].substring(0,colorStr[2].length - 1))],
                coordinates: []
            };
            (child as paper.Path).segments.forEach(segment => {
                let coordinate: number[] = [];
                coordinate.push(this.convertDownCoordinate(segment.point.x));
                coordinate.push(this.convertDownCoordinate(segment.point.y));
                seg.coordinates.push(coordinate);
            });
            frame.paths.push(seg);
        });
        // console.log('Layers: ', paper.project.layers);
        // console.log('Animation: ', this.animation);
    }

    convertDownCoordinate(nr: number): number {
        return (nr * 100) - 32768;
    }
}