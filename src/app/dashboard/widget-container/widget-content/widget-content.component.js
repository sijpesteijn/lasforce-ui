"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WidgetContentComponent = (function () {
    function WidgetContentComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    WidgetContentComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.componentFactory = _this.componentFactoryResolver.resolveComponentFactory(_this.widgetMetadata.component);
            var createdComponent = _this.location.createComponent(_this.componentFactory);
            // if (this.sharedService) {
            //     createdComponent.instance.sharedService = this.location.injector.get(this.sharedService);
            // }
        }, 0);
    };
    return WidgetContentComponent;
}());
__decorate([
    core_1.Input('widgetMetadata')
], WidgetContentComponent.prototype, "widgetMetadata", void 0);
__decorate([
    core_1.Input('sharedService')
], WidgetContentComponent.prototype, "sharedService", void 0);
__decorate([
    core_1.ViewChild('location', { read: core_1.ViewContainerRef })
], WidgetContentComponent.prototype, "location", void 0);
WidgetContentComponent = __decorate([
    core_1.Component({
        selector: 'widget-content',
        template: require('./widget-content.html'),
        styles: [require('./widget-content.scss')]
    })
], WidgetContentComponent);
exports.WidgetContentComponent = WidgetContentComponent;
