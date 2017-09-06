import { Component } from '@angular/core';

@Component({
    selector: 'show_details',
    template: require('./show_details.html'),
    styles: [require('./show_details.scss')]
})
export class ShowDetailsComponent {
    private moe: string = 'moe';
}
