import {
    Component,
    ViewEncapsulation
} from '@angular/core';

declare var fabric: any;

@Component({
    selector     : 'app',
    encapsulation: ViewEncapsulation.None,
    styles       : [require('./app.component.css')],
    template     : require('./app.html')
})
export class AppComponent {
    private showMenu: boolean = false;

    constructor() {
        console.log(fabric.version);
    }

    onNavigationEvent($event) {
        this.showMenu = !this.showMenu;
    }

    closeMenu() {
        this.showMenu = false;
    }
}
