import {
    Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'infinite-knob',
    template: require('./infinite-knob.html'),
    styles: [require('./infinite-knob.scss')]
})
export class InfiniteKnobComponent {
    @ViewChild('knob')
    _elementRef: ElementRef;
    private mousedown    = false;
    private currentY: number;
    private angle       = 0;
    @Input('angle')
    set theAngle(angle: number) {
        this.angle = angle;
        if (this.angle < this.min) {
            this.angle = this.min;
        }
        if (this.max > 0 && this.angle > this.max) {
            this.angle = this.max;
        }
        // console.log('Angle ', this.angle);
        this._elementRef.nativeElement.style.transform = 'rotate(' + this.angle + 'deg)';
    }
    @Input('step') step        = 5;
    @Input('min') min         = 0;
    @Input('max') max         = -1;
    @Output('onChange') onChange   = new EventEmitter();
    @Output('onFinished') onFinished = new EventEmitter();

    @HostListener('window:mouseup', ['$event'])
    onMouseup(event) {
        this.mousedown = false;
        this.onFinished.emit(this.angle);
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        this.mousedown = true;
        this.currentY = event.clientY;
        return false; // Call preventDefault() on the event
    }

    @HostListener('window:mousemove', ['$event'])
    onMousemove(event) {
        if (this.mousedown) {
            let delta = this.currentY - event.clientY;
            if (delta > 0) {
                this.angle += this.step;
            } else if (delta < 0 && this.angle > this.min) {
                this.angle -= this.step;
            }
            this.currentY = event.clientY;
            this._elementRef.nativeElement.style.transform = 'rotate(' + this.angle + 'deg)';
            this.onChange.emit(this.angle);
        }
    }

    @HostListener('mouseout', ['$event'])
    onMouseout(event) {
        return false; // Call preventDefault() on the event
    }
}