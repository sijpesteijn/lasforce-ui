import { Component, AfterViewInit } from '@angular/core';
import {
    DashboardEventService, LOAD_ANIMATION, ANIMATION_FRAME_SELECTED
} from '../../dashboard/dashboard.service';
import { AnimationService } from '../animation.service';
import { Animation, Frame, Coordinate } from '../animation';
import fabric = require('fabric');

@Component({
    selector: 'animation_canvas',
    template: require('./animation_canvas.html'),
    styles: [require('./animation_canvas.scss')]
})
export class AnimationCanvasComponent {
    private animation: Animation;
    private canvas: any;
    constructor(private events: DashboardEventService, private animationService: AnimationService) {
    }

    ngOnInit() {
        this.canvas = new fabric.Canvas('animation');
        this.canvas.setHeight(656);
        this.canvas.setWidth(656);

        // this.canvas.on('mouse:over', function(e) {
        //     console.log(e);
        // });

        this.animationService.getAnimation().subscribe(animation => this.animation = animation);

        this.events.subscribe(event => {
            if (event.key === 'selectTool') {
                console.log('Tool: ', event.value);
            }
            if (event.key === ANIMATION_FRAME_SELECTED) {
                console.log('Tot ' + this.animation.frames.length + ' ' + event.value);
                this.loadFrame(this.animation.frames[event.value]);
            }
        });
    }

    loadFrame(frame: Frame) {
        this.canvas.clear();
        frame.segments.forEach(segment => {
            let color = segment.color;
            // console.log('Col: ', color);
            let begin: Coordinate = undefined;
            let end: Coordinate = undefined;
            segment.coordinates.forEach(coordinate => {
                if (begin == undefined) {
                    begin = coordinate;
                } else {
                    end = coordinate;
                    let coords = [this.convert(begin[0]) ,this.convert(begin[1]) , this.convert(end[0]) , this.convert(end[1])];
                    let line = new fabric.Line(coords, {
                        fill: 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')',
                        stroke: 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')',
                        strokeWidth: 2,
                        selectable: false
                    });
                    line.on('mouse:over', function(e) {
                        console.log(e);
                    });

                    this.canvas.add(line);
                    begin = end;
                }
            });
        });

    }

    convert(nr: number) {
        return (nr + 32768)/100;
    }
}
