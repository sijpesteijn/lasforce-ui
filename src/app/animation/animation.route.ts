import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AnimationCanvasComponent } from './animation_canvas/animation_canvas.component';
import { AnimationToolsComponent } from './animation_tools/animation_tools.component';
import { AnimationListComponent } from './animation_list/animation_list.component';
import { PlayerComponent } from '../player/player.component';
import { AnimationFramesComponent } from './animation_frames/animation_frames.component';
import { AuthGuard } from '../security/authguard';
import { AnimationFrameDetailsComponent } from './animation_frame_details/animation_frame_details.component';
import { PaperAnimationService } from './paper_animation.service';
import { AnimationInfoComponent } from './animation_info/animation_info.component';
import { AnimationDetailsComponent } from './animation_details/animation_details.component';
import { NgModule } from '@angular/core';
import { CreateAnimationControl } from './animation_list/controls/create-animation/create-animation-control.component';
import { UploadAnimationControl } from './animation_list/controls/upload-animation/upload-animation-control.component';
import { CreateFrameControl } from './animation_frames/controls/create-frame-control.component.ts/create-frame-control.component';
import { AnimationPlayerComponent } from './animation_player/animation_player.component';

export const ANIMATION_ROUTES: Routes = [
    {
        path: '', children: [
        {
            path     : 'animation_edit',
            component  : DashboardComponent,
            canActivate: [AuthGuard],
            data       : {
                sharedService  : PaperAnimationService,
                gridConfig     : {
                    draggable  : false,
                    show_header: false,
                    resizable  : false
                },
                widgetsMetadata: [
                    {
                        title    : 'ANIMATION.LIST.TITLE',
                        component: AnimationListComponent,
                        controls : [
                            UploadAnimationControl,
                            CreateAnimationControl
                        ],
                        config   : {
                            dragHandle: '.handle',
                            col       : 1,
                            row       : 1,
                            sizex     : 8,
                            sizey     : 8
                        }
                    },
                    {
                        title    : 'ANIMATION.INFO.TITLE',
                        component: AnimationDetailsComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 1,
                            row       : 9,
                            sizex     : 8,
                            sizey     : 9
                        }
                    },
                    {
                        component: AnimationCanvasComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 9,
                            row       : 1,
                            sizex     : 20,
                            sizey     : 20
                        }
                    },
                    {
                        component: AnimationToolsComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 29,
                            row       : 1,
                            sizex     : 6,
                            sizey     : 3
                        }
                    },
                    {
                        component: AnimationPlayerComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 29,
                            row       : 3,
                            sizex     : 8,
                            sizey     : 4
                        }
                    },
                    {
                        title    : 'ANIMATION.FRAMES.TITLE',
                        component: AnimationFramesComponent,
                        controls : [
                            CreateFrameControl
                        ],
                        config   : {
                            dragHandle: '.handle',
                            col       : 29,
                            row       : 7,
                            sizex     : 8,
                            sizey     : 12
                        }
                    },
                    // {
                    //     component: AnimationFrameDetailsComponent,
                    //     config   : {
                    //         dragHandle: '.handle',
                    //         col       : 17,
                    //         row       : 13,
                    //         sizex     : 4,
                    //         sizey     : 6
                    //     }
                    // },
                ]
            }
        },
        {
            path       : 'animation_list',
            component  : DashboardComponent,
            canActivate: [AuthGuard],
            data       : {
                sharedService  : PaperAnimationService,
                gridConfig     : {
                    draggable  : false,
                    show_header: false,
                    resizable  : false
                },
                widgetsMetadata: [
                    {
                        title    : 'ANIMATION.LIST.TITLE',
                        component: AnimationListComponent,
                        controls : [
                            UploadAnimationControl,
                            CreateAnimationControl
                        ],
                        config   : {
                            dragHandle: '.handle',
                            col       : 1,
                            row       : 1,
                            sizex     : 8,
                            sizey     : 8
                        }
                    },
                    {
                        title    : 'ANIMATION.INFO.TITLE',
                        component: AnimationDetailsComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 1,
                            row       : 9,
                            sizex     : 8,
                            sizey     : 8
                        }
                    },
                    {
                        component: AnimationCanvasComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 9,
                            row       : 1,
                            sizex     : 20,
                            sizey     : 20
                        }
                    },
                    {
                        component: AnimationToolsComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 29,
                            row       : 1,
                            sizex     : 6,
                            sizey     : 3
                        }
                    },
                    {
                        component: AnimationPlayerComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 29,
                            row       : 3,
                            sizex     : 6,
                            sizey     : 3
                        }
                    },
                    {
                        title    : 'ANIMATION.FRAMES.TITLE',
                        component: AnimationFramesComponent,
                        controls : [
                            CreateFrameControl
                        ],
                        config   : {
                            dragHandle: '.handle',
                            col       : 29,
                            row       : 7,
                            sizex     : 8,
                            sizey     : 12
                        }
                    },
                    // {
                    //     component: AnimationFrameDetailsComponent,
                    //     config   : {
                    //         dragHandle: '.handle',
                    //         col       : 17,
                    //         row       : 13,
                    //         sizex     : 4,
                    //         sizey     : 6
                    //     }
                    // },
                ]
            }
        },

    ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(ANIMATION_ROUTES)],
    exports: [RouterModule],
})
export class AnimationRoutingModule {
}