import { Component, ElementRef, Input, Renderer, ViewChild } from '@angular/core';
import { SliderEvent, SliderEventService } from '../slider-event.service';

export interface SliderBarConfig {
    start: number;
    end: number;
}

@Component({
    selector: 'slider-bar',
    template: require('./slider-bar.html'),
    styles: [require('./slider-bar.scss')]
})
export class SliderBarComponent {
    private mousedown: boolean = false;
    public sliderBarConfig: SliderBarConfig;
    private target: any;
    private mouseDownX: number = 0;
    private leftLimit: number = 14;
    private type: string;
    @Input('sliderBarConfig')
    set theSliderBarConfig(sliderBarConfig: SliderBarConfig) {
        console.log(sliderBarConfig);
        this.sliderBarConfig = sliderBarConfig;
    }
    @ViewChild('sliderBar')
    private sliderBar: ElementRef;
    @ViewChild('sliderHandleLeft')
    private sliderHandleLeft: ElementRef;
    @ViewChild('sliderLableLeft')
    private sliderLableLeft: ElementRef;
    @ViewChild('sliderHandleRight')
    private sliderHandleRight: ElementRef;
    @ViewChild('sliderLableRight')
    private sliderLableRight: ElementRef;

    constructor(private renderer: Renderer,
                private events: SliderEventService) {

    }

    ngAfterViewInit() {
        this.setLeftHandle();
        this.setRightHandle();
    }

    mouseDown(event) {
        this.mousedown = true;
        this.target = event.target;
        this.type = this.getType(this.target.classList);
        this.mouseDownX = event.layerX;
        this.sliderBar.nativeElement.style.border = '2px solid orange';
        this.events.emit(new SliderEvent('barMouseDown', this));
    }

    mouseUp(event) {
        this.mousedown = false;
        this.target = undefined;
        this.sliderBar.nativeElement.style.border = 'none';
        this.events.emit(new SliderEvent('barMouseUp', this));
    }

    mouseMove(event: MouseEvent) {
        if (this.mousedown === true) {
            let delta = event.layerX - this.mouseDownX;
            if (this.type === 'sliderbar') {
                if (Math.abs(delta) > 3) {
                    if (this.sliderBarConfig.start + delta >= this.leftLimit) {
                        this.sliderBarConfig.start += delta;
                        this.sliderBarConfig.end += delta;
                    }
                    this.mouseDownX = event.layerX;
                    this.setLeftHandle();
                    this.setRightHandle();
                }
            } else if (this.type === 'sliderbarLeft') {
                if (this.sliderBarConfig.start + delta < this.sliderBarConfig.end) {
                    this.sliderBarConfig.start += delta;
                    this.mouseDownX = event.layerX;
                    this.setLeftHandle();
                }
            } else {
                if (this.sliderBarConfig.end + delta > this.sliderBarConfig.start) {
                    this.sliderBarConfig.end += delta;
                    this.mouseDownX = event.layerX;
                    this.setRightHandle();
                }
            }
        }
    }

    private setStart(start: number) {
        this.sliderBarConfig.start = start;
    }

    private setEnd(end: number) {
        this.sliderBarConfig.end = end;
    }

    public setLeftHandle() {
        this.sliderBar.nativeElement.style.left = this.sliderBarConfig.start + 'px';
        this.sliderHandleLeft.nativeElement.style.left = this.sliderBarConfig.start + 'px';
        this.sliderLableLeft.nativeElement.style.left = (this.sliderBarConfig.start - 16) + 'px';
    }

    public setRightHandle() {
        // this.sliderBar.nativeElement.style.width = this.sliderBarConfig.end - this.sliderBarConfig.start + 'px';
        this.sliderHandleRight.nativeElement.style.left = this.sliderBarConfig.end + 'px';
        this.sliderLableRight.nativeElement.style.left = (this.sliderBarConfig.end - 25) + 'px';
    }

    private getType(classList: DOMTokenList): string {
        if (classList.length === 1) {
            return 'sliderbar';
        } else if (classList[1] === 'ui-slider-leftHandle') {
            return 'sliderbarLeft';
        }
        return 'sliderbarRight';
    }
}