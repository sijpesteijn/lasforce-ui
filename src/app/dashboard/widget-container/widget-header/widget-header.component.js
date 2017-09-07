"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WidgetHeaderComponent = (function () {
    function WidgetHeaderComponent(viewContainer, componentFactoryResolver) {
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    WidgetHeaderComponent.prototype.ngAfterViewInit = function () {
        // setTimeout(() => {
        //     this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
        //     let createdComponent = this.location.createComponent(this.componentFactory);
        // }, 0);
    };
    return WidgetHeaderComponent;
}());
__decorate([
    core_1.Input('widgetMetadata')
], WidgetHeaderComponent.prototype, "widgetMetadata", void 0);
__decorate([
    core_1.Input('sharedService')
], WidgetHeaderComponent.prototype, "sharedService", void 0);
__decorate([
    core_1.ViewChild('location', { read: core_1.ViewContainerRef })
], WidgetHeaderComponent.prototype, "location", void 0);
WidgetHeaderComponent = __decorate([
    core_1.Component({
        selector: 'widget-header',
        template: require('./widget-header.html'),
        styles: [require('./widget-header.scss')]
    })
], WidgetHeaderComponent);
exports.WidgetHeaderComponent = WidgetHeaderComponent;
