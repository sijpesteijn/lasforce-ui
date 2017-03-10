import { NgModule } from '@angular/core';
import { PlayerComponent } from './player.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardModule
    ],
    exports: [
        PlayerComponent
    ],
    declarations: [
        PlayerComponent
    ],
    providers: [
    ]
})
export class PlayerModule {
}