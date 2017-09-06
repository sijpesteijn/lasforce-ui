import { Component } from '@angular/core';
import { Show } from '../show';
import { ShowService } from '../show.service';

@Component({
    selector: 'show_list',
    template: require('./show_list.html'),
    styles: [require('./show_list.scss')]
})
export class ShowListComponent {
    private shows: Show[] = [];
    private status: string = 'loading';

    constructor(private showService: ShowService) {
    }

    ngAfterViewInit() {
        this.showService.getShows().subscribe(shows => {
            this.shows = shows;
            this.status = 'loaded';
        });
    }

    preview(id: number) {
        this.showService.getShowById(id).subscribe(show => {});
    }

    newShow() {
        let show: Show = new Show();
        show.id = new Date().getTime();
        this.showService.saveShow(show).subscribe();
    }
}