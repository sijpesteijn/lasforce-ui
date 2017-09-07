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
var AnimationFrameDetailsComponent = (function () {
    function AnimationFrameDetailsComponent(events) {
        this.events = events;
        this.nodes = [];
        this.config = {
            allowDrag: true,
            allowDrop: true
        };
    }
    AnimationFrameDetailsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sharedService.getPaperAnimation().subscribe(function (paperAnimation) {
            if (paperAnimation.layers.length > 0) {
                _this.paperAnimation = paperAnimation;
                _this.loadObjects(0);
            }
        });
        this.events.subscribe(function (event) {
            if (event.key === dashboard_service_1.ANIMATION_FRAME_SELECTED) {
                _this.loadObjects(event.value);
            }
        });
    };
    AnimationFrameDetailsComponent.prototype.handleEvent = function (event) {
        console.log('Handle event');
        if (event.node.data.paper.type === 'path') {
            event.node.data.paper.fullySelected = true;
        }
        else {
            event.node.data.paper.selected = true;
        }
    };
    AnimationFrameDetailsComponent.prototype.onActiveChanged = function (event) {
        this.handleEvent(event);
    };
    AnimationFrameDetailsComponent.prototype.onFocus = function (event) {
        this.handleEvent(event);
    };
    AnimationFrameDetailsComponent.prototype.onBlur = function (event) {
        this.handleEvent(event);
    };
    AnimationFrameDetailsComponent.prototype.onActivate = function (event) {
        this.handleEvent(event);
    };
    AnimationFrameDetailsComponent.prototype.onDeactivate = function (event) {
        this.handleEvent(event);
    };
    AnimationFrameDetailsComponent.prototype.loadObjects = function (frameNr) {
        var _this = this;
        this.nodes = [];
        if (this.paperAnimation.layers.length > 0) {
            var frame = this.paperAnimation.layers[frameNr];
            frame.children.forEach(function (path) {
                var segm = {
                    name: (path.data.name !== undefined && path.data.name !== '') ? path.data.name : 'No name',
                    id: path.id,
                    children: [],
                    paper: path
                };
                _this.nodes.push(segm);
                path.segments.forEach(function (segment) {
                    segm.children.push({
                        name: 'P(' + segment.point.x + 'x' + segment.point.y + ')',
                        id: segment.id,
                        hasChildren: false,
                        paper: segment
                    });
                });
            });
        }
    };
    return AnimationFrameDetailsComponent;
}());
AnimationFrameDetailsComponent = __decorate([
    core_1.Component({
        selector: 'animation_frame_details',
        template: require('./animation_frame_details.html'),
        styles: [require('./animation_frame_details.scss')]
    })
], AnimationFrameDetailsComponent);
exports.AnimationFrameDetailsComponent = AnimationFrameDetailsComponent;
