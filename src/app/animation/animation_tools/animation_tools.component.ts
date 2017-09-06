import { Component, AfterViewInit } from '@angular/core';
import { DashboardEventService, DashboardEvent } from '../../dashboard/dashboard.service';
import {
    LineToolHandler, RectangleToolHandler, SelectToolHandler, ToolHandler
} from '../animation_canvas/tool_handler.component';
import { HistoryService } from '../../history/history.service';
import { PaperAnimationService } from '../paper_animation.service';
import { AnimationService } from '../animation.service';

@Component({
    selector: 'animation_tools',
    template: require('./animation_tools.html'),
    styles  : [require('./animation_tools.scss')],
})
export class AnimationToolsComponent {
    private selectedTool: ToolHandler;
    toolHandlers: Map<string, ToolHandler> = new Map();
    private selectToolHandler = new SelectToolHandler(this.historyService);
    public pickerOptions = {
        borderRadius: 0,
        availableColors: ['#f00', '#0f0', '#00f', '#ffff00']
    };

    constructor(private events: DashboardEventService,
                private animationService: AnimationService,
                private historyService: HistoryService) {
        this.toolHandlers.set('select', this.selectToolHandler);
        this.toolHandlers.set('rectangle', new RectangleToolHandler(this.selectToolHandler));
        this.toolHandlers.set('line', new LineToolHandler(this.selectToolHandler));
    }

    ngOnInit() {
        this.animationService.getAnimation().subscribe(animation => {
            if (animation !== undefined && animation.frames.length > 0 && this.selectedTool === undefined) {
                this.selectTool('select');
            }
        });
    }

    selectTool(tool: string) {
        this.selectedTool = this.toolHandlers.get(tool);
        this.events.emit(new DashboardEvent('selectTool', this.selectedTool));
    }

    selectColor(color: any) {
        this.toolHandlers.forEach(toolHandler => toolHandler.setColor(color));
    }
}