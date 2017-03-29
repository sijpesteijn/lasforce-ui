import { GridConfig } from './gridconfig';


export interface WidgetGridConfig {
    dragHandle: string;
    col: number;
    row: number;
}

export interface WidgetMetadata {
    component: any;
    widgetGridConfig: WidgetGridConfig;
}

export interface DashboardMetadata {
    gridConfig: GridConfig;
    sharedService: any;
    widgetsMetadata: WidgetMetadata[];
}