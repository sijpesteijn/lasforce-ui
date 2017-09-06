import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from './history.service';

NgModule( {
    imports: [
        CommonModule
    ],
    providers: [
        HistoryService
    ]
})
export class HistoryModule {

}