import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GridConfig } from './gridconfig';
import { DashboardMetadata } from './dashboard';

@Component({
    selector: 'dashboard',
    template: require('./dashboard.html'),
    styles  : [require('./dashboard.scss')]
})
export class DashboardComponent implements OnInit {
    private widgets                = new BehaviorSubject([]);
    private sharedService: any;
    private gridConfig: GridConfig = {
        margins        : [5],
        visible_cols   : 60,
        visible_rows   : 50,
        draggable      : true,
        show_header    : true,
        max_cols       : 0,
        max_rows       : 0,
        min_cols       : 1,
        min_rows       : 1,
        col_width      : 25,
        row_height     : 25,
        cascade        : 'off',
        min_width      : 5,
        min_height     : 5,
        fix_to_grid    : true,
        auto_style     : true,
        auto_resize    : false,
        maintain_ratio : false,
        prefer_new     : false,
        zoom_on_drag   : false,
        limit_to_screen: true
    };

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: DashboardMetadata) => {
            this.gridConfig = this.overrideDefaults(data.gridConfig);
            this.sharedService    = data.sharedService;
            this.widgets.next(data.widgetsMetadata)
        });
    }

    updateItem(item: any, $event: any) {
        // console.log('Update: ', $event);
    }

    onResize(item: any, $event: any) {
        // console.log('Resize: ', item);
    }

    onDrag(item: any, $event: any) {
        // console.log('Drag: ', item);
    }

    removeWidget(item: any) {
        // console.log('Remove: ', item);
    }

    public overrideDefaults(gridConfig: GridConfig): GridConfig {
        for (let key in gridConfig) {
            if (key !== undefined) {
                this.gridConfig[key] = gridConfig[key];
            }
        }
        return this.gridConfig;
    }

}
