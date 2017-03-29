import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AnimationCanvasComponent } from './animation_canvas/animation_canvas.component';
import { AnimationToolsComponent } from './animation_tools/animation_tools.component';
import { AnimationListComponent } from './animation_list/animation_list.component';
import { PlayerComponent } from '../player/player.component';
import { AnimationFramesComponent } from './animation_frames/animation_frames.component';
import { AuthGuard } from '../security/authguard';
import { AnimationFrameComponent } from './animation_frame/animation_frame.component';
import { PaperAnimationService } from './paper_animation.service';

export const ANIMATION_ROUTES: Routes = [
    {
        path: '', children: [
        {
            path     : 'edit',
            component: DashboardComponent,
            data     : {
                gridConfig: {
                    draggable      : false,
                    show_header    : false
                },
                widgetsMetadata   : [
                    {
                        component: AnimationListComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 1,
                            row       : 1
                        }
                    },
                    {
                        component: AnimationToolsComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 6,
                            row       : 1
                        }
                    },
                    {
                        component: AnimationCanvasComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 13,
                            row       : 1
                        }
                    }
                ]
            }
        },
        {
            path: 'list',
            component: DashboardComponent,
            canActivate: [AuthGuard],
            data : {
                sharedService: PaperAnimationService,
                gridConfig: {
                    draggable      : false,
                    show_header    : false
                },
                widgetsMetadata   : [
                    {
                        component: AnimationListComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 1,
                            row       : 1,
                            sizex     : 3,
                            sizey     : 8
                        }
                    },
                    {
                        component: AnimationCanvasComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 5,
                            row       : 1,
                            sizex     : 12,
                            sizey     : 20
                        }
                    },
                    // {
                    //     component: PlayerComponent,
                    //     config   : {
                    //         dragHandle: '.handle',
                    //         col       : 16,
                    //         row       : 1,
                    //         sizex     : 4,
                    //         sizey     : 2
                    //     }
                    // },
                    // {
                    //     component: AnimationFramesComponent,
                    //     config   : {
                    //         dragHandle: '.handle',
                    //         col       : 16,
                    //         row       : 3,
                    //         sizex     : 4,
                    //         sizey     : 6
                    //     }
                    // },
                    // {
                    //     component: AnimationFrameComponent,
                    //     config   : {
                    //         dragHandle: '.handle',
                    //         col       : 16,
                    //         row       : 9,
                    //         sizex     : 4,
                    //         sizey     : 6
                    //     }
                    // }

                ]
            }
        }
    ]
    },
];