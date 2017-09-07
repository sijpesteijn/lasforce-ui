"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var animation_1 = require("./animation");
var AnimationService = (function () {
    function AnimationService(http, settings) {
        this.http = http;
        this.settings = settings;
        this.animation = new rxjs_1.BehaviorSubject(new animation_1.Animation());
    }
    AnimationService.prototype.getAnimation = function () {
        return this.animation;
    };
    AnimationService.prototype.getAnimations = function () {
        var _this = this;
        return this.settings.get('animation.all').concatMap(function (url) {
            return _this.http.get(url, {})
                .map(function (response) { return response.json(); });
        });
    };
    AnimationService.prototype.getAnimationById = function (id) {
        var _this = this;
        return this.settings.get('animation.get').concatMap(function (url) {
            return _this.http.get(url.replace(':id', id), {})
                .map(function (response) {
                var result = response.json();
                _this.animation.next(result);
                return result;
            });
        });
    };
    AnimationService.prototype.saveAnimation = function (animation) {
        var _this = this;
        return this.settings.get('animation.save').concatMap(function (url) {
            var options = new http_1.RequestOptions();
            options.headers = new http_1.Headers();
            options.headers.append('Content-Type', 'application/json');
            return _this.http.post(url, JSON.stringify(animation), options).map(function (response) {
                // let result = response.json();
                // this.animation.next(result); // TODO correct antwoord van be
                // return result;
                _this.animation.next(animation);
                return animation;
            });
        });
    };
    return AnimationService;
}());
AnimationService = __decorate([
    core_1.Injectable()
], AnimationService);
exports.AnimationService = AnimationService;
