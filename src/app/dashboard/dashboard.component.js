"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DashboardComponent = (function () {
    function DashboardComponent(route) {
        this.route = route;
        this.widgets = new rxjs_1.BehaviorSubject([]);
        this.gridConfig = {
            margins: [5],
            visible_cols: 16,
            visible_rows: 23,
            draggable: true,
            show_header: true,
            max_cols: 0,
            max_rows: 0,
            min_cols: 1,
            min_rows: 1,
            col_width: 25,
            row_height: 25,
            cascade: 'up',
            min_width: 5,
            min_height: 5,
            fix_to_grid: true,
            auto_style: true,
            auto_resize: false,
            maintain_ratio: false,
            prefer_new: false,
            zoom_on_drag: false,
            limit_to_screen: true
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.gridConfig = _this.overrideDefaults(data.gridConfig);
            _this.sharedService = data.sharedService;
            _this.widgets.next(data.widgetsMetadata);
        });
    };
    DashboardComponent.prototype.updateItem = function (item, $event) {
        // console.log('Update: ', $event);
    };
    DashboardComponent.prototype.onResize = function (item, $event) {
        // console.log('Resize: ', item);
    };
    DashboardComponent.prototype.onDrag = function (item, $event) {
        // console.log('Drag: ', item);
    };
    DashboardComponent.prototype.removeWidget = function (item) {
        // console.log('Remove: ', item);
    };
    DashboardComponent.prototype.overrideDefaults = function (gridConfig) {
        for (var key in gridConfig) {
            if (key !== undefined) {
                this.gridConfig[key] = gridConfig[key];
            }
        }
        return this.gridConfig;
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        template: require('./dashboard.html'),
        styles: [require('./dashboard.scss')]
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
