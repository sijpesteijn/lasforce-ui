import { NgModule } from '@angular/core';
import { ANIMATION_ROUTES } from './animation.route';
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
import { AnimationFrameComponent } from './animation_frame/animation_frame.component';
import { PaperAnimationService } from './paper_animation.service';
import { TranslateI18NextModule } from 'angular2-i18next';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateI18NextModule,
        RouterModule,
        DashboardModule,
        PlayerModule,
        SpinnerModule,
        TreeModule,
        RouterModule.forChild(ANIMATION_ROUTES)
    ],
    declarations: [
        AnimationFramesComponent,
        AnimationFrameComponent,
        AnimationListComponent,
        AnimationCanvasComponent,
        AnimationToolsComponent
    ],
    providers: [
        AnimationService,
        PaperAnimationService
    ]
})
export class AnimationModule {
    public static routes = ANIMATION_ROUTES;
}