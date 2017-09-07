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
var authguard_1 = require("../security/authguard");
var show_list_component_1 = require("./show_list/show_list.component");
var show_details_component_1 = require("./show_details/show_details.component");
var animation_list_component_1 = require("../animation/animation_list/animation_list.component");
var core_1 = require("@angular/core");
exports.SHOW_ROUTES = [
    {
        path: '', children: [
            {
                path: 'show_list',
                component: dashboard_component_1.DashboardComponent,
                canActivate: [authguard_1.AuthGuard],
                data: {
                    gridConfig: {
                        draggable: false,
                        show_header: false
                    },
                    widgetsMetadata: [
                        {
                            component: show_list_component_1.ShowListComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 1,
                                row: 1,
                                sizex: 8,
                                sizey: 8
                            }
                        },
                        {
                            component: show_details_component_1.ShowDetailsComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 1,
                                row: 9,
                                sizex: 32,
                                sizey: 4
                            }
                        },
                        {
                            component: animation_list_component_1.AnimationListComponent,
                            config: {
                                dragHandle: '.handle',
                                col: 33,
                                row: 1,
                                sizex: 8,
                                sizey: 8
                            }
                        }
                    ]
                }
            },
        ]
    },
];
var ShowRoutingModule = (function () {
    function ShowRoutingModule() {
    }
    return ShowRoutingModule;
}());
ShowRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.SHOW_ROUTES)],
        exports: [router_1.RouterModule]
    })
], ShowRoutingModule);
exports.ShowRoutingModule = ShowRoutingModule;
