import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Widget } from './widget.directive';
import { NgGridModule } from 'angular2-grid';
import { DashboardEventService } from './dashboard.service';

@NgModule({
    imports: [
        CommonModule,
        NgGridModule
    ],
    exports: [
        DashboardComponent
    ],
    declarations: [
        DashboardComponent,
        Widget
    ],
    providers: [
        DashboardEventService
    ]
})
export class DashboardModule {}