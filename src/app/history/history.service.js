"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var paper = require("paper");
var HistoryService = (function () {
    function HistoryService() {
        this.history = [];
        this.historyIndex = 0;
    }
    HistoryService.prototype.clear = function () {
        this.history = [];
        this.historyIndex = 0;
    };
    HistoryService.prototype.add = function (item) {
        if (this.historyIndex < this.history.length) {
            this.history = this.history.slice(this.historyIndex, this.history.length);
        }
        this.historyIndex = this.history.push(item);
    };
    HistoryService.prototype.undo = function () {
        if (this.historyIndex > 0) {
            var item = this.history[this.historyIndex - 1];
            item.remove();
            this.historyIndex--;
        }
    };
    HistoryService.prototype.redo = function () {
        if (this.historyIndex < this.history.length) {
            var item = this.history[this.historyIndex++];
            paper.project.activeLayer.addChild(item);
        }
    };
    HistoryService.prototype.canUndo = function () {
        return this.historyIndex > 0;
    };
    HistoryService.prototype.canRedo = function () {
        return this.historyIndex < this.history.length;
    };
    return HistoryService;
}());
HistoryService = __decorate([
    core_1.Injectable()
], HistoryService);
exports.HistoryService = HistoryService;
