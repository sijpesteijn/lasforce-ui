import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { WidgetDirective } from './widget.directive';
import { NgGridModule } from 'angular2-grid';
import { DashboardEventService } from './dashboard.service';
import { WidgetContainerComponent } from './widget-container/widget-container.component';
import { WidgetHeaderComponent } from './widget-container/widget-header/widget-header.component';
import { WidgetContentComponent } from './widget-container/widget-content/widget-content.component';
import { TranslateI18NextModule } from 'angular2-i18next';
import { WidgetControlDirective } from './widget-control.directive';
import { WidgetFooterComponent } from "./widget-container/widget-footer/widget-footer.component";

@NgModule({
    imports: [
        CommonModule,
        NgGridModule,
        TranslateI18NextModule
    ],
    exports: [
        DashboardComponent
    ],
    declarations: [
        DashboardComponent,
        WidgetControlDirective,
        WidgetDirective,
        WidgetContainerComponent,
        WidgetContentComponent,
        WidgetHeaderComponent,
        WidgetFooterComponent
    ],
    providers: [
        DashboardEventService
    ],
    entryComponents: [
        WidgetContainerComponent
    ]
})
export class DashboardModule {}