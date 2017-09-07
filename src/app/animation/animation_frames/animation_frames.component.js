"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dashboard_service_1 = require("../../dashboard/dashboard.service");
var paper = require("paper");
var AnimationFramesComponent = (function () {
    function AnimationFramesComponent(animationService, historyService, events) {
        this.animationService = animationService;
        this.historyService = historyService;
        this.events = events;
    }
    AnimationFramesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.animationService.getAnimation().subscribe(function (animation) {
            if (animation !== undefined && animation.id !== 0) {
                _this.animation = animation;
            }
        });
    };
    AnimationFramesComponent.prototype.loadFrame = function (frameNumber) {
        this.events.emit(new dashboard_service_1.DashboardEvent(dashboard_service_1.ANIMATION_FRAME_SELECTED, frameNumber));
    };
    AnimationFramesComponent.prototype.newFrame = function (clone) {
        var title = this.animation.frames[this.animation.current_frame].name;
        var frame = {
            id: this.animation.frames.length + 1,
            repeat: 1,
            name: title,
            total_segments: 0,
            segments: []
        };
        this.animation.current_frame = frame.id - 1;
        this.animation.frames.push(frame);
        if (clone) {
            this.cloneCurrentObjects(frame);
        }
        this.animationService.saveAnimation(this.animation).subscribe();
    };
    AnimationFramesComponent.prototype.cloneCurrentObjects = function (frame) {
        var _this = this;
        var children = paper.project.activeLayer.children;
        children.forEach(function (child) {
            var colorStr = child.strokeColor.toCSS(false).split(',');
            var seg = {
                closed: child.closed,
                color: [
                    Number(colorStr[0].substring(4)),
                    Number(colorStr[1]),
                    Number(colorStr[2].substring(0, colorStr[2].length - 1))
                ],
                coordinates: []
            };
            child.segments.forEach(function (segment) {
                var coordinate = [];
                coordinate.push(_this.convertDownCoordinate(segment.point.x));
                coordinate.push(_this.convertDownCoordinate(segment.point.y));
                seg.coordinates.push(coordinate);
            });
            frame.segments.push(seg);
        });
        // console.log('Layers: ', paper.project.layers);
        // console.log('Animation: ', this.animation);
    };
    AnimationFramesComponent.prototype.convertDownCoordinate = function (nr) {
        return (nr * 100) - 32768;
    };
    return AnimationFramesComponent;
}());
AnimationFramesComponent = __decorate([
    core_1.Component({
        selector: 'animation_frames',
        template: require('./animation_frames.html'),
        styles: [require('./animation_frames.scss')]
    })
], AnimationFramesComponent);
exports.AnimationFramesComponent = AnimationFramesComponent;
