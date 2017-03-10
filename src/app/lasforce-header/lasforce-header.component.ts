import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AppEventService, TITLE, LOGOUT } from '../app.service';
import { DashboardEvent } from '../dashboard/dashboard.service';

@Component({
    template: require('./lasforce-header.html'),
    selector: 'lasforce-header',
    styles: [require('./lasforce-header.scss')]
})
export class LasforceHeaderComponent {
    @Input()
    private showMenu: boolean = false;
    @Output()
    private navigationEvent = new EventEmitter();
    private title: string = 'Las Force';

    constructor(private events: AppEventService) {}

    ngOnInit() {
        this.events.subscribe(event => {
            if (event.key === TITLE) {
                this.title = event.value;
            }
        })
    }

    toggleMenu($event: any) {
        this.navigationEvent.emit();
    }

}
