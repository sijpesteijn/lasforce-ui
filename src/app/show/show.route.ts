import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../security/authguard';
import { ShowListComponent } from './show_list/show_list.component';
import { ShowDetailsComponent } from './show_details/show_details.component';
import { AnimationListComponent } from '../animation/animation_list/animation_list.component';
import { NgModule } from '@angular/core';
import { CreateShowControl } from './show_list/controls/create-show-control.component.ts/create-show-control.component';
import { UploadAnimationControl } from '../animation/animation_list/controls/upload-animation/upload-animation-control.component';
import { CreateAnimationControl } from '../animation/animation_list/controls/create-animation/create-animation-control.component';
import { ShowCanvasComponent } from './show_canvas/show_canvas.component';

export const SHOW_ROUTES: Routes = [
    {
        path: '', children: [
        {
            path: 'show_list',
            component: DashboardComponent,
            canActivate: [AuthGuard],
            data : {
                gridConfig: {
                    draggable      : false,
                    show_header    : false
                },
                widgetsMetadata   : [
                    // {
                    //     title: 'SHOW.LIST.TITLE',
                    //     controls: [CreateShowControl],
                    //     component: ShowListComponent,
                    //     config   : {
                    //         dragHandle: '.handle',
                    //         col       : 1,
                    //         row       : 1,
                    //         sizex     : 8,
                    //         sizey     : 10
                    //     }
                    // },
                    // {
                    //     component: ShowCanvasComponent,
                    //     config   : {
                    //         dragHandle: '.handle',
                    //         col       : 9,
                    //         row       : 1,
                    //         sizex     : 15,
                    //         sizey     : 15
                    //     }
                    // },
                    {
                        component: ShowDetailsComponent,
                        config   : {
                            dragHandle: '.handle',
                            col       : 3,
                            row       : 1,
                            sizex     : 1,
                            sizey     : 1
                        }
                    },
                    // {
                    //     title    : 'ANIMATION.LIST.TITLE',
                    //     component: AnimationListComponent,
                    //     controls : [
                    //         CreateAnimationControl
                    //     ],
                    //     config   : {
                    //         dragHandle: '.handle',
                    //         col       : 33,
                    //         row       : 1,
                    //         sizex     : 8,
                    //         sizey     : 8
                    //     }
                    // }

                ]
            }
        },

    ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(SHOW_ROUTES)],
    exports: [RouterModule]
})
export class ShowRoutingModule {}