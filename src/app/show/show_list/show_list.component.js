"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var show_1 = require("../show");
var ShowListComponent = (function () {
    function ShowListComponent(showService) {
        this.showService = showService;
        this.animations = [];
        this.status = 'loading';
    }
    ShowListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.showService.getShows().subscribe(function (animations) {
            _this.animations = animations;
            _this.status = 'loaded';
        });
    };
    ShowListComponent.prototype.preview = function (id) {
        this.showService.getShowById(id).subscribe(function (animation) { });
    };
    ShowListComponent.prototype.newShow = function () {
        var show = new show_1.Show();
        this.showService.saveShow(show).subscribe();
    };
    return ShowListComponent;
}());
ShowListComponent = __decorate([
    core_1.Component({
        selector: 'show_list',
        template: require('./show_list.html'),
        styles: [require('./show_list.scss')]
    })
], ShowListComponent);
exports.ShowListComponent = ShowListComponent;
