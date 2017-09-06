import { NgModule } from '@angular/core';
import { AnimationRoutingModule } from './animation.route';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnimationEditComponent } from './edit/animation_edit.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AnimationCanvasComponent } from './animation_canvas/animation_canvas.component';
import { AnimationToolsComponent } from './animation_tools/animation_tools.component';
import { AnimationService } from './animation.service';
import { AnimationListComponent } from './animation_list/animation_list.component';
import { PlayerModule } from '../player/player.module';
import { AnimationFramesComponent } from './animation_frames/animation_frames.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { TreeModule } from 'angular-tree-component/dist/angular-tree-component';
import { AnimationFrameDetailsComponent } from './animation_frame_details/animation_frame_details.component';
import { PaperAnimationService } from './paper_animation.service';
import { TranslateI18NextModule } from 'angular2-i18next';
import { AnimationInfoComponent } from "./animation_info/animation_info.component";
import { ColorPickerModule } from './animation_tools/color-picker/color-picker.module';
import { AnimationDetailsComponent } from './animation_details/animation_details.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { CreateAnimationControl } from './animation_list/controls/create-animation/create-animation-control.component';
import { UploadAnimationControl } from './animation_list/controls/upload-animation/upload-animation-control.component';
import { CreateFrameControl } from './animation_frames/controls/create-frame-control.component.ts/create-frame-control.component';
import { DndModule } from 'ng2-dnd';
import { ZoomModule } from '../zoom/zoom.module';
import { AnimationPlayerComponent } from './animation_player/animation_player.component';
import { InfiniteKnobModule } from '../infinite-knob/infinite-knob.module';
import {NgxDeleteConfirmModule} from "ngx-delete-confirm/esm/src";
import {NgxClickToEditModule} from "ngx-click-to-edit/esm/src";

@NgModule({
    imports: [
        AnimationRoutingModule,
        BsDropdownModule.forRoot(),
        ColorPickerModule,
        CommonModule,
        DashboardModule,
        DndModule.forRoot(),
        FileUploadModule,
        NgxDeleteConfirmModule.forRoot(),
        NgxClickToEditModule.forRoot(),
        FormsModule,
        InfiniteKnobModule,
        PlayerModule,
        RouterModule,
        SpinnerModule,
        TranslateI18NextModule,
        TreeModule,
        ZoomModule
    ],
    exports: [
        AnimationListComponent
    ],
    declarations: [
        AnimationCanvasComponent,
        AnimationFramesComponent,
        AnimationFrameDetailsComponent,
        AnimationDetailsComponent,
        AnimationListComponent,
        AnimationPlayerComponent,
        AnimationToolsComponent,
        CreateAnimationControl,
        CreateFrameControl,
        UploadAnimationControl,
    ],
    providers: [
        AnimationService,
        PaperAnimationService
    ],
    entryComponents: [
        AnimationListComponent
    ]
})
export class AnimationModule {
}