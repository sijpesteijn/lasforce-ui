"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SettingsService = (function () {
    function SettingsService(http, path) {
        this.http = http;
        this.path = path;
    }
    SettingsService.prototype.get = function (key) {
        return this.getData().map(function (data) {
            var keys = key.split('.');
            var result = data;
            keys.forEach(function (k) { return result = result[k]; });
            return result;
        });
    };
    SettingsService.prototype.getData = function () {
        if (!this.settingsData) {
            this.settingsData = this.http.get(this.path)
                .map(function (res) { return res.json(); }).publishLast().refCount();
        }
        return this.settingsData;
    };
    return SettingsService;
}());
SettingsService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject('settings.path'))
], SettingsService);
exports.SettingsService = SettingsService;
