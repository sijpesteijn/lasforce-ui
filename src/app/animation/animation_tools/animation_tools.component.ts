import { Component, AfterViewInit } from '@angular/core';
import { DashboardEventService, DashboardEvent } from '../../dashboard/dashboard.service';

@Component({
    selector: 'animation_tools',
    template: require('./animation_tools.html'),
    styles  : [require('./animation_tools.scss')],
})
export class AnimationToolsComponent implements AfterViewInit {
    private selectedTool: string;

    constructor(private events: DashboardEventService) {}

    ngAfterViewInit() {
    }

    selectTool(tool: string) {
        this.selectedTool = tool;
        this.events.emit(new DashboardEvent('selectTool', tool));
    }

    undo() {

    }

    redo() {

    }
}