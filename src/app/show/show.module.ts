import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardModule } from '../dashboard/dashboard.module';
import { PlayerModule } from '../player/player.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { TreeModule } from 'angular-tree-component/dist/angular-tree-component';
import { TranslateI18NextModule } from 'angular2-i18next';
import { ClickToEditModule } from '../click-to-edit/click-to-edit.module';
import { ShowRoutingModule } from './show.route';
import { ShowListComponent } from './show_list/show_list.component';
import { ShowService } from './show.service';
import { ShowDetailsComponent } from './show_details/show_details.component';
import { AnimationModule } from '../animation/animation.module';
import { CreateShowControl } from './show_list/controls/create-show-control.component.ts/create-show-control.component';
import { ShowCanvasComponent } from './show_canvas/show_canvas.component';
import { SliderModule } from '../slider/slider.module';
import {NgxDeleteConfirmModule} from "ngx-delete-confirm/esm/src";
import {NgxClickToEditModule} from "ngx-click-to-edit/esm/src";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateI18NextModule,
        NgxDeleteConfirmModule.forRoot(),
        NgxClickToEditModule.forRoot(),
        AnimationModule,
        RouterModule,
        DashboardModule,
        PlayerModule,
        SpinnerModule,
        TreeModule,
        ShowRoutingModule,
        SliderModule
    ],
    declarations: [
        CreateShowControl,
        ShowCanvasComponent,
        ShowDetailsComponent,
        ShowListComponent,
    ],
    providers: [
        ShowService
    ]
})
export class ShowModule {
}