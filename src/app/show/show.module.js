"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var dashboard_module_1 = require("../dashboard/dashboard.module");
var player_module_1 = require("../player/player.module");
var spinner_module_1 = require("../spinner/spinner.module");
var angular_tree_component_1 = require("angular-tree-component/dist/angular-tree-component");
var angular2_i18next_1 = require("angular2-i18next");
var click_to_edit_module_1 = require("../click-to-edit/click-to-edit.module");
var show_route_1 = require("./show.route");
var show_list_component_1 = require("./show_list/show_list.component");
var show_service_1 = require("./show.service");
var show_details_component_1 = require("./show_details/show_details.component");
var animation_module_1 = require("../animation/animation.module");
var ShowModule = (function () {
    function ShowModule() {
    }
    return ShowModule;
}());
ShowModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            angular2_i18next_1.TranslateI18NextModule,
            animation_module_1.AnimationModule,
            router_1.RouterModule,
            dashboard_module_1.DashboardModule,
            player_module_1.PlayerModule,
            spinner_module_1.SpinnerModule,
            click_to_edit_module_1.ClickToEditModule,
            angular_tree_component_1.TreeModule,
            show_route_1.ShowRoutingModule
        ],
        declarations: [
            show_details_component_1.ShowDetailsComponent,
            show_list_component_1.ShowListComponent
        ],
        providers: [
            show_service_1.ShowService
        ]
    })
], ShowModule);
exports.ShowModule = ShowModule;
