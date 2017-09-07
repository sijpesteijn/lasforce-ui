"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animation_1 = require("../../../animation");
var CreateAnimationControl = (function () {
    function CreateAnimationControl(animationService) {
        this.animationService = animationService;
    }
    CreateAnimationControl.prototype.newAnimation = function () {
        var animation = new animation_1.Animation();
        animation.id = 1;
        animation.name = 'New Animation';
        animation.repeat = 1;
        animation.last_update = 0;
        animation.current_frame = 0;
        animation.frame_time = 10;
        animation.total_frames = 1;
        animation.frames = [];
        var frame = {
            id: 1,
            repeat: 1,
            name: 'Frame',
            total_segments: 0,
            segments: []
        };
        animation.frames.push(frame);
        this.animationService.saveAnimation(animation).subscribe();
    };
    return CreateAnimationControl;
}());
CreateAnimationControl = __decorate([
    core_1.Component({
        selector: 'create-animation',
        template: require('./create-animation-control.html')
    })
], CreateAnimationControl);
exports.CreateAnimationControl = CreateAnimationControl;
