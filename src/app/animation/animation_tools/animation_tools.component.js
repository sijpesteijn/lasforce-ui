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
var tool_handler_component_1 = require("../tool_handlers/tool_handler.component");
var AnimationToolsComponent = (function () {
    function AnimationToolsComponent(events, sharedService, historyService) {
        this.events = events;
        this.sharedService = sharedService;
        this.historyService = historyService;
        this.toolHandlers = new Map();
        this.selectToolHandler = new tool_handler_component_1.SelectToolHandler(this.historyService);
        this.pickerOptions = {
            borderRadius: 0,
            availableColors: ['#f00', '#0f0', '#00f', '#ffff00']
        };
        this.toolHandlers.set('select', this.selectToolHandler);
        this.toolHandlers.set('rectangle', new tool_handler_component_1.RectangleToolHandler(this.selectToolHandler));
        this.toolHandlers.set('line', new tool_handler_component_1.LineToolHandler(this.selectToolHandler));
    }
    AnimationToolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sharedService.getPaperAnimation().subscribe(function (paperAnimation) {
            if (paperAnimation.layers.length > 0 && _this.selectedTool === undefined) {
                _this.selectTool('select');
            }
        });
    };
    AnimationToolsComponent.prototype.selectTool = function (tool) {
        this.selectedTool = this.toolHandlers.get(tool);
        this.events.emit(new dashboard_service_1.DashboardEvent('selectTool', this.selectedTool));
    };
    AnimationToolsComponent.prototype.selectColor = function (color) {
        this.toolHandlers.forEach(function (toolHandler) { return toolHandler.setColor(color); });
    };
    return AnimationToolsComponent;
}());
AnimationToolsComponent = __decorate([
    core_1.Component({
        selector: 'animation_tools',
        template: require('./animation_tools.html'),
        styles: [require('./animation_tools.scss')],
    })
], AnimationToolsComponent);
exports.AnimationToolsComponent = AnimationToolsComponent;
