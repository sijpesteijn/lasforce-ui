import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomComponent } from './zoom.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ZoomComponent
    ],
    exports: [
        ZoomComponent
    ]
})
export class ZoomModule {}