import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { TranslateI18Next } from 'angular2-i18next';
import { LanguageDetectorService } from './i18n/language.detector.service';

@Component({
    selector     : 'app',
    encapsulation: ViewEncapsulation.None,
    styles       : [require('./app.component.css')],
    template     : require('./app.html')
})
export class AppComponent {
    private showMenu: boolean = false;
    localState = { value: '' };
    date: Date = new Date();

    constructor(private translateI18Next: TranslateI18Next,
                private languageDetector: LanguageDetectorService) {
        translateI18Next.init({
            lng                    : 'nl',
            fallbackLng            : 'nl',
            browserLanguageDetector: languageDetector,
            debug                  : false
        });
    }

    onNavigationEvent($event) {
        this.showMenu = !this.showMenu;
    }

    closeMenu() {
        this.showMenu = false;
    }
}
