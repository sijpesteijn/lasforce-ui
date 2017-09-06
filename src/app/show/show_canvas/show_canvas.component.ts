import { Component, ViewChild } from '@angular/core';
import * as paper from 'paper';

@Component({
    selector: 'show-canvas',
    template: require('./show_canvas.html'),
    styles: [require('./show_canvas.scss')]
})
export class ShowCanvasComponent {
    @ViewChild('show')
    private canvas: any;
    private status: string           = 'loaded';

    ngAfterViewInit() {
        paper.install(window);
        paper.setup(this.canvas.nativeElement);

    }
}