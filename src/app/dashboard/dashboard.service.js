"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.MOUSE_CURSOR_EVENT = 'mouseCursorEvent';
exports.LOAD_ANIMATION = 'loadAnimation';
exports.ANIMATION_NEXT_FRAME = 'animationNextFrame';
exports.ANIMATION_LAST_FRAME = 'animationLastFrame';
exports.ANIMATION_PREV_FRAME = 'animationPrevFrame';
exports.ANIMATION_FIRST_FRAME = 'animationFirstFrame';
exports.ANIMATION_FRAME_SELECTED = 'animationFrameSelected';
exports.ANIMATION_FRAME_OBJECT_SELECTED = 'animationFrameObjectSelected';
exports.ANIMATION_FRAME_OBJECT_DESELECTED = 'animationFrameObjectDeselected';
var DashboardEvent = (function () {
    function DashboardEvent(key, value) {
        this.key = key;
        this.value = value;
    }
    return DashboardEvent;
}());
exports.DashboardEvent = DashboardEvent;
var DashboardEventService = (function () {
    function DashboardEventService() {
        this.events = new core_1.EventEmitter();
    }
    DashboardEventService.prototype.emit = function (event) {
        this.events.emit(event);
    };
    DashboardEventService.prototype.subscribe = function (callback) {
        return this.events.subscribe(callback);
    };
    DashboardEventService.prototype.takeUntil = function (callback) {
        return this.events.takeUntil(callback);
    };
    return DashboardEventService;
}());
DashboardEventService = __decorate([
    core_1.Injectable()
], DashboardEventService);
exports.DashboardEventService = DashboardEventService;
