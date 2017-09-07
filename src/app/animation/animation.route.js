"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var dashboard_component_1 = require("../dashboard/dashboard.component");
var animation_canvas_component_1 = require("./animation_canvas/animation_canvas.component");
var animation_tools_component_1 = require("./animation_tools/animation_tools.component");
var animation_list_component_1 = require("./animation_list/animation_list.component");
var player_component_1 = require("../player/player.component");
var animation_frames_component_1 = require("./animation_frames/animation_frames.component");
var authguard_1 = require("../security/authguard");
var paper_animation_service_1 = require("./paper_animation.service");
var animation_details_component_1 = require("./animation_details/animation_details.component");
var core_1 = require("@angular/core");
var create_animation_control_component_1 = require("./animation_list/controls/create-animation/create-animation-control.component");
var upload_animation_control_component_1 = require("./animation_list/controls/upload-animation/upload-animation-control.component");
exports.ANIMATION_ROUTES = [
    {
        path: '', children: [
            {
                path: 'edit',
                component: dashboard_component_1.DashboardComponent,
                data: {
                    gridConfig: {
                        draggable: false,
                        show_header: false
                    },
                    widgetsMetadata: [
                        {
                            component: animation_list_component_1.AnimationListComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 1,
                                row: 1
                            }
                        },
                        {
                            component: animation_tools_component_1.AnimationToolsComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 6,
                                row: 1
                            }
                        },
                        {
                            component: animation_canvas_component_1.AnimationCanvasComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 13,
                                row: 1
                            }
                        }
                    ]
                }
            },
            {
                path: 'animation_list',
                component: dashboard_component_1.DashboardComponent,
                canActivate: [authguard_1.AuthGuard],
                data: {
                    sharedService: paper_animation_service_1.PaperAnimationService,
                    gridConfig: {
                        draggable: false,
                        show_header: false
                    },
                    widgetsMetadata: [
                        {
                            title: 'ANIMATION.LIST.TITLE',
                            component: animation_list_component_1.AnimationListComponent,
                            controls: [
                                upload_animation_control_component_1.UploadAnimationControl,
                                create_animation_control_component_1.CreateAnimationControl
                            ],
                            config: {
                                dragHandle: '.handle',
                                col: 1,
                                row: 1,
                                sizex: 8,
                                sizey: 8
                            }
                        },
                        {
                            title: 'ANIMATION.INFO.TITLE',
                            component: animation_details_component_1.AnimationDetailsComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 1,
                                row: 9,
                                sizex: 8,
                                sizey: 8
                            }
                        },
                        {
                            component: animation_canvas_component_1.AnimationCanvasComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 9,
                                row: 1,
                                sizex: 20,
                                sizey: 20
                            }
                        },
                        {
                            component: animation_tools_component_1.AnimationToolsComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 29,
                                row: 1,
                                sizex: 6,
                                sizey: 3
                            }
                        },
                        {
                            component: player_component_1.PlayerComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 29,
                                row: 3,
                                sizex: 6,
                                sizey: 2
                            }
                        },
                        {
                            title: 'ANIMATION.FRAMES.TITLE',
                            component: animation_frames_component_1.AnimationFramesComponent,
                            controls: [],
                            config: {
                                dragHandle: '.handle',
                                col: 29,
                                row: 7,
                                sizex: 8,
                                sizey: 6
                            }
                        },
                    ]
                }
            },
        ]
    },
];
var AnimationRoutingModule = (function () {
    function AnimationRoutingModule() {
    }
    return AnimationRoutingModule;
}());
AnimationRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.ANIMATION_ROUTES)],
        exports: [router_1.RouterModule],
    })
], AnimationRoutingModule);
exports.AnimationRoutingModule = AnimationRoutingModule;
