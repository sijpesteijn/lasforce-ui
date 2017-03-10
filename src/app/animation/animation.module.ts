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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DashboardModule,
        PlayerModule,
        SpinnerModule,
        RouterModule.forChild(ANIMATION_ROUTES)
    ],
    declarations: [
        AnimationFramesComponent,
        AnimationListComponent,
        AnimationCanvasComponent,
        AnimationToolsComponent
    ],
    providers: [
        AnimationService
    ]
})
export class AnimationModule {
    public static routes = ANIMATION_ROUTES;
}