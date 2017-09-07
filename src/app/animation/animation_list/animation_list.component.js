"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AnimationListComponent = (function () {
    function AnimationListComponent(animationService) {
        this.animationService = animationService;
        this.animations = [];
        this.status = 'loading';
    }
    AnimationListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.animationService.getAnimations().subscribe(function (animations) {
            _this.animations = animations;
            _this.status = 'loaded';
        });
    };
    AnimationListComponent.prototype.preview = function (id) {
        this.animationService.getAnimationById(id).subscribe(function (animation) { });
    };
    return AnimationListComponent;
}());
AnimationListComponent = __decorate([
    core_1.Component({
        selector: 'animation_list',
        template: require('./animation_list.html'),
        styles: [require('./animation_list.scss')]
    })
], AnimationListComponent);
exports.AnimationListComponent = AnimationListComponent;
