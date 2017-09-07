"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animation_route_1 = require("./animation.route");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var dashboard_module_1 = require("../dashboard/dashboard.module");
var animation_canvas_component_1 = require("./animation_canvas/animation_canvas.component");
var animation_tools_component_1 = require("./animation_tools/animation_tools.component");
var animation_service_1 = require("./animation.service");
var animation_list_component_1 = require("./animation_list/animation_list.component");
var player_module_1 = require("../player/player.module");
var animation_frames_component_1 = require("./animation_frames/animation_frames.component");
var spinner_module_1 = require("../spinner/spinner.module");
var angular_tree_component_1 = require("angular-tree-component/dist/angular-tree-component");
var animation_frame_details_component_1 = require("./animation_frame_details/animation_frame_details.component");
var paper_animation_service_1 = require("./paper_animation.service");
var angular2_i18next_1 = require("angular2-i18next");
var color_picker_module_1 = require("./animation_tools/color-picker/color-picker.module");
var click_to_edit_module_1 = require("../click-to-edit/click-to-edit.module");
var animation_details_component_1 = require("./animation_details/animation_details.component");
var ng2_file_upload_1 = require("ng2-file-upload");
var create_animation_control_component_1 = require("./animation_list/controls/create-animation/create-animation-control.component");
var upload_animation_control_component_1 = require("./animation_list/controls/upload-animation/upload-animation-control.component");
var AnimationModule = (function () {
    function AnimationModule() {
    }
    return AnimationModule;
}());
AnimationModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            angular2_i18next_1.TranslateI18NextModule,
            router_1.RouterModule,
            dashboard_module_1.DashboardModule,
            player_module_1.PlayerModule,
            spinner_module_1.SpinnerModule,
            click_to_edit_module_1.ClickToEditModule,
            color_picker_module_1.ColorPickerModule,
            angular_tree_component_1.TreeModule,
            ng2_file_upload_1.FileUploadModule,
            animation_route_1.AnimationRoutingModule
        ],
        exports: [
            animation_list_component_1.AnimationListComponent
        ],
        declarations: [
            animation_canvas_component_1.AnimationCanvasComponent,
            animation_frames_component_1.AnimationFramesComponent,
            animation_frame_details_component_1.AnimationFrameDetailsComponent,
            animation_details_component_1.AnimationDetailsComponent,
            animation_list_component_1.AnimationListComponent,
            animation_tools_component_1.AnimationToolsComponent,
            create_animation_control_component_1.CreateAnimationControl,
            upload_animation_control_component_1.UploadAnimationControl
        ],
        providers: [
            animation_service_1.AnimationService,
            paper_animation_service_1.PaperAnimationService
        ],
        entryComponents: [
            animation_list_component_1.AnimationListComponent
        ]
    })
], AnimationModule);
exports.AnimationModule = AnimationModule;
