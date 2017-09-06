
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderBarComponent } from './slider-bar/slider-bar.component';
import { SliderEventService } from './slider-event.service';
import { SliderComponent } from './slider/slider.component';
@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        SliderComponent
    ],
    declarations: [
        SliderComponent,
        SliderBarComponent
    ],
    providers: [
        SliderEventService
    ]
})
export class SliderModule {}