"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PaperAnimationService = (function () {
    function PaperAnimationService() {
        this.animationSubject = new rxjs_1.BehaviorSubject({ layers: [] });
    }
    PaperAnimationService.prototype.getPaperAnimation = function () {
        return this.animationSubject;
    };
    PaperAnimationService.prototype.setPaperAnimation = function (animation) {
        this.animationSubject.next(animation);
    };
    return PaperAnimationService;
}());
PaperAnimationService = __decorate([
    core_1.Injectable()
], PaperAnimationService);
exports.PaperAnimationService = PaperAnimationService;
