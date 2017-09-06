import { Component } from '@angular/core';
import { SliderEvent, SliderEventService } from '../slider-event.service';
import { SliderBarComponent, SliderBarConfig } from '../slider-bar/slider-bar.component';
import * as $ from 'jquery';

@Component({
    selector: 'slider',
    template: require('./slider.html'),
    styles: [require('./slider.scss')]
})
export class SliderComponent {
    private mouseDown: boolean = false;
    // private sliderBarConfig1: SliderBarConfig = {
    //     start: 40,
    //     end: 200
    // };
    // private sliderBarConfig2: SliderBarConfig = {
    //     start: 1210,
    //     end: 1400
    // };
    // private target: SliderBarComponent;
    constructor(private events: SliderEventService) {}

    ngAfterViewInit() {
        let that = this;
        $('div.ui-slider-container').mousemove(function(e){
            if (that.mouseDown) {
                // console.log('E ', e);
                let x = (e.originalEvent as MouseEvent).layerX - 25;
                if (x > 0 && x <= 400) {
                    $('div.box').css({'left': x});
                }
            }
        });
        $('div.ui-slider-container').mousedown(function(e) {
            that.mouseDown = true;
        });
        $('div.ui-slider-container').mouseup(function(e) {
            that.mouseDown = false;
        });
    }

    // mouseMove(event) {
    //     // if (this.mouseDown) {
    //     //     this.target.sliderBarConfig.end = event.layerX;
    //         // this.target.setLeftHandle();
    //         // this.target.setRightHandle();
    //         // console.log(this.target.sliderBarConfig);
    //     console.log('E ', event);
    //     // }
    // }
}
