import { GridConfig } from './gridconfig';
import { Control } from './control.component';


export interface WidgetGridConfig {
    dragHandle: string;
    col: number;
    row: number;
}

export interface WidgetMetadata {
    title: string;
    component: any;
    controls: Control[];
    widgetGridConfig: WidgetGridConfig;
}

export interface DashboardMetadata {
    gridConfig: GridConfig;
    sharedService: any;
    widgetsMetadata: WidgetMetadata[];
}