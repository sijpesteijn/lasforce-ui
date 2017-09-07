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
var index_1 = require("./index");
var ShowService = (function () {
    function ShowService(http, settings) {
        this.http = http;
        this.settings = settings;
        this.show = new rxjs_1.BehaviorSubject(new index_1.Show());
    }
    ShowService.prototype.getShow = function () {
        return this.show;
    };
    ShowService.prototype.getShows = function () {
        var _this = this;
        return this.settings.get('show.all').concatMap(function (url) {
            return _this.http.get(url, {})
                .map(function (response) { return response.json(); });
        });
    };
    ShowService.prototype.getShowById = function (id) {
        var _this = this;
        return this.settings.get('show.get').concatMap(function (url) {
            return _this.http.get(url.replace(':id', id), {})
                .map(function (response) {
                var result = response.json();
                _this.show.next(result);
                return result;
            });
        });
    };
    ShowService.prototype.saveShow = function (animation) {
        var _this = this;
        return this.settings.get('show.save').concatMap(function (url) {
            var options = new http_1.RequestOptions();
            options.headers = new http_1.Headers();
            options.headers.append('Content-Type', 'application/json');
            return _this.http.post(url, JSON.stringify(animation), options).map(function (response) {
                // let result = response.json();
                // this.animation.next(result); // TODO correct antwoord van be
                // return result;
                _this.show.next(animation);
                return animation;
            });
        });
    };
    return ShowService;
}());
ShowService = __decorate([
    core_1.Injectable()
], ShowService);
exports.ShowService = ShowService;
