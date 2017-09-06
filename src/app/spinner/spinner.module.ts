import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        SpinnerComponent
    ],
    declarations: [
        SpinnerComponent
    ],
    providers: [],
    entryComponents: [
        SpinnerComponent
    ]
})
export class SpinnerModule {
}
