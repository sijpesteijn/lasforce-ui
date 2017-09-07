"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dashboard_component_1 = require("./dashboard.component");
var widget_directive_1 = require("./widget.directive");
var angular2_grid_1 = require("angular2-grid");
var dashboard_service_1 = require("./dashboard.service");
var widget_container_component_1 = require("./widget-container/widget-container.component");
var widget_header_component_1 = require("./widget-container/widget-header/widget-header.component");
var widget_content_component_1 = require("./widget-container/widget-content/widget-content.component");
var angular2_i18next_1 = require("angular2-i18next");
var widget_control_directive_1 = require("./widget-control.directive");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular2_grid_1.NgGridModule,
            angular2_i18next_1.TranslateI18NextModule
        ],
        exports: [
            dashboard_component_1.DashboardComponent
        ],
        declarations: [
            dashboard_component_1.DashboardComponent,
            widget_control_directive_1.WidgetControlDirective,
            widget_directive_1.WidgetDirective,
            widget_container_component_1.WidgetContainerComponent,
            widget_content_component_1.WidgetContentComponent,
            widget_header_component_1.WidgetHeaderComponent
        ],
        providers: [
            dashboard_service_1.DashboardEventService
        ],
        entryComponents: [
            widget_container_component_1.WidgetContainerComponent
        ]
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
