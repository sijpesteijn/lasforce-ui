import { NgGridConfig } from 'angular2-grid';

export interface GridConfig extends NgGridConfig {
    show_header?: boolean;
    removable?: boolean;
    fixed?: boolean;
}
