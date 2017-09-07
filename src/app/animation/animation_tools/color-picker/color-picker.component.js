"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.DEFAULT_COLORS = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#00ffff',
    '#ffff00'
];
var ColorPickerConfiguration = (function () {
    function ColorPickerConfiguration() {
        this.width = 25;
        this.height = 25;
        this.borderRadius = 4;
        this.availableColors = exports.DEFAULT_COLORS;
    }
    return ColorPickerConfiguration;
}());
exports.ColorPickerConfiguration = ColorPickerConfiguration;
var ColorPickerComponent = (function () {
    function ColorPickerComponent() {
        this.onChange = new core_1.EventEmitter();
        this.color = exports.DEFAULT_COLORS[0];
        this.config = new ColorPickerConfiguration();
    }
    ColorPickerComponent.prototype.setColor = function (color) {
        this.color = color;
        this.onChange.emit(color);
    };
    return ColorPickerComponent;
}());
__decorate([
    core_1.Output()
], ColorPickerComponent.prototype, "onChange", void 0);
ColorPickerComponent = __decorate([
    core_1.Component({
        selector: 'color-picker',
        styles: [require('./color-picker.scss')],
        template: require('./color-picker.html')
    })
], ColorPickerComponent);
exports.ColorPickerComponent = ColorPickerComponent;
