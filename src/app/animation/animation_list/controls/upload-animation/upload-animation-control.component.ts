

import { Component } from '@angular/core';
import { Animation, Frame } from '../../../animation';
import { AnimationService } from '../../../animation.service';
import { FileUploader } from 'ng2-file-upload';
import { SettingsService } from '../../../../settings.service';
@Component({
    selector: 'upload-animation',
    template: require('./upload-animation-control.html'),
    styles: [require('./upload-animation-control.scss')]
})
export class UploadAnimationControl {
    public uploader:FileUploader;

    constructor(private settings: SettingsService,
                private animationService: AnimationService) {
        this.settings.get('animation.upload').subscribe(url => {
            this.uploader = new FileUploader({url: url});
        });
    }

    newAnimation() {
        let animation = new Animation();
        animation.id = 1;
        animation.name = 'New Animation';
        animation.repeat = 1;
        animation.last_update = 0;
        animation.current_frame = 0;
        animation.frame_time = 10;
        animation.total_frames = 1;
        animation.frames = [];
        let frame: Frame = {
            id         : 1,
            repeat     : 1,
            name       : 'Frame',
            total_paths: 0,
            paths      : []
        };
        animation.frames.push(frame);
        this.animationService.saveAnimation(animation).subscribe();
    }

    private upload() {
        let elm = document.getElementById('animation-file');
        elm.addEventListener('change', (ev => {
           console.log((ev.target as any));
        }));
        elm.click();
        return false;
    }
}