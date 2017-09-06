import { Component } from '@angular/core';
import { Animation, Frame } from '../../../animation';
import { AnimationService } from '../../../animation.service';
import * as paper from 'paper';
import { Show } from '../../../show';
import { ShowService } from '../../../show.service';

@Component({
    selector: 'create-show',
    template: require('./create-show-control.html')
})
export class CreateShowControl {
    private show: Show;

    constructor(private showService: ShowService) {}

    ngOnInit() {
        this.showService.getShow().subscribe(show => {
            if(show !== undefined && show.id !== 0) {
                this.show = show;
            }
        });
    }

    private newShow(clone: boolean) {
        // let title = this.show.frames[this.show.current_frame].name;
        // let frame = {
        //     id: this.show.frames.length + 1,
        //     repeat: 1,
        //     name: title,
        //     total_segments: 0,
        //     segments: []
        // };
        // this.show.current_frame = frame.id - 1;
        // this.show.frames.push(frame);
        // this.show.total_frames = this.show.frames.length;
        // if (clone) {
        //     this.cloneCurrentObjects(frame)
        // }
        // this.showService.saveAnimation(this.show).subscribe();
    }
}