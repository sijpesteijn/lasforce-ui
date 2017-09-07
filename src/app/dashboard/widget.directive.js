"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var widget_container_component_1 = require("./widget-container/widget-container.component");
var WidgetDirective = (function () {
    function WidgetDirective(viewContainer, componentFactoryResolver) {
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    WidgetDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.componentFactory = _this.componentFactoryResolver.resolveComponentFactory(widget_container_component_1.WidgetContainerComponent);
            var createdComponent = _this.viewContainer.createComponent(_this.componentFactory, 0, _this.viewContainer.injector);
            createdComponent.instance.widgetMetadata = _this.widgetMetadata;
            // if (this.sharedService) {
            //     createdComponent.instance.sharedService = this.viewContainer.injector.get(this.sharedService);
            // }
        }, 0);
    };
    return WidgetDirective;
}());
__decorate([
    core_1.Input('widgetMetadata')
], WidgetDirective.prototype, "widgetMetadata", void 0);
__decorate([
    core_1.Input('sharedService')
], WidgetDirective.prototype, "sharedService", void 0);
WidgetDirective = __decorate([
    core_1.Directive({
        selector: 'widget'
    })
], WidgetDirective);
exports.WidgetDirective = WidgetDirective;
