import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown/bs-dropdown.module';

@NgModule({
    imports: [
        CommonModule,
        BsDropdownModule.forRoot()
    ],
    exports: [
        ColorPickerComponent
    ],
    declarations: [
        ColorPickerComponent
    ]
})
export class ColorPickerModule {

}
