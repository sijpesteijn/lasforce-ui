import {
    Component, animate, style, transition, state, trigger, Output, EventEmitter
} from '@angular/core';

@Component({
    selector: 'navigation',
    template: require('./navigation.html'),
    styles: [require('./navigation.scss')],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(150)
            ]),
            state('out', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(150)
            ])
        ])
    ]
})
export class NavigationComponent {

    @Output()
    private onClose = new EventEmitter();

    closeNav() {
        this.onClose.emit('close');
    }
}