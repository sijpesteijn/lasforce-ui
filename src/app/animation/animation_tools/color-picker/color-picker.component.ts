import { Component, EventEmitter, Output } from '@angular/core';

export const DEFAULT_COLORS = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#00ffff',
    '#ffff00'
];

export class ColorPickerConfiguration {
    public width: number;
    public height: number;
    public availableColors: string[];
    public borderRadius: number;

    constructor() {
        this.width = 25;
        this.height = 25;
        this.borderRadius = 4;
        this.availableColors = DEFAULT_COLORS;
    }
}

@Component({
    selector: 'color-picker',
    styles: [require('./color-picker.scss')],
    template: require('./color-picker.html')
})
export class ColorPickerComponent {
    @Output() onChange: EventEmitter<string> = new EventEmitter();
    public config: ColorPickerConfiguration;
    private color: string = DEFAULT_COLORS[0];

    constructor() {
        this.config = new ColorPickerConfiguration();
    }

    public setColor(color: string) {
        this.color = color;
        this.onChange.emit(color);
    }
}