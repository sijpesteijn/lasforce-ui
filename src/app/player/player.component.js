"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dashboard_service_1 = require("../dashboard/dashboard.service");
var PlayerComponent = (function () {
    function PlayerComponent(events) {
        this.events = events;
        this.intervalSubscription = undefined;
    }
    PlayerComponent.prototype.nextFrame = function () {
        this.events.emit(new dashboard_service_1.DashboardEvent(dashboard_service_1.ANIMATION_NEXT_FRAME));
    };
    PlayerComponent.prototype.lastFrame = function () {
        this.events.emit(new dashboard_service_1.DashboardEvent(dashboard_service_1.ANIMATION_LAST_FRAME));
    };
    PlayerComponent.prototype.prevFrame = function () {
        this.events.emit(new dashboard_service_1.DashboardEvent(dashboard_service_1.ANIMATION_PREV_FRAME));
    };
    PlayerComponent.prototype.firstFrame = function () {
        this.events.emit(new dashboard_service_1.DashboardEvent(dashboard_service_1.ANIMATION_FIRST_FRAME));
    };
    PlayerComponent.prototype.play = function () {
        var _this = this;
        this.intervalSubscription = setInterval(function () {
            _this.events.emit(new dashboard_service_1.DashboardEvent(dashboard_service_1.ANIMATION_NEXT_FRAME));
        }, 200);
    };
    PlayerComponent.prototype.stop = function () {
        clearInterval(this.intervalSubscription);
        this.intervalSubscription = undefined;
    };
    return PlayerComponent;
}());
PlayerComponent = __decorate([
    core_1.Component({
        selector: 'player-controls',
        template: require('./player.html')
    })
], PlayerComponent);
exports.PlayerComponent = PlayerComponent;
