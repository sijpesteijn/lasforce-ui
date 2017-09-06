import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'zoom',
    template: require('./zoom.html'),
    styles: [require('./zoom.scss')]
})
export class ZoomComponent {
    private zoom: number = 0;
    @Input('min') min: number = 0;
    @Input('max') max: number = 100;
    @Input('step') step: number = 10;
    @Input('zoom')
    set theZoom(zoom:number) {
        this.zoom = Math.round(zoom);
        if (this.zoom < this.min) {
            this.zoom = this.min;
        }
        if (this.zoom > this.max) {
            this.zoom = this.max;
        }
    }
    @Output('onZoom') onZoom = new EventEmitter();

    private zoomDown(): void {
        if (this.zoom - this.step < this.min) {
            this.zoom = this.min;
        } else {
            this.zoom -= this.step;
        }
        this.onZoom.emit(this.zoom);
    }

    private zoomUp() {
        if (this.zoom + this.step > this.max) {
            this.zoom = this.max;
        } else {
            this.zoom += this.step;
        }
        this.onZoom.emit(this.zoom);
    }

    private resetZoom() {
        this.zoom = this.max < 100 ? this.max : 100;
        this.onZoom.emit(this.zoom);
    }
}