import { Injectable, Inject } from '@angular/core';
import { ILanguageDetector } from 'angular2-i18next';

@Injectable()
export class LanguageDetectorService implements ILanguageDetector {

    constructor(@Inject(Window) private window: Window) {
    }

    detect() {
        let lang = this.window.navigator.language;
        // for all browser locales starting with 'en' (en-US, en-GB, etc), use translation 'en'.
        if (lang && lang.substring(0, 2) === 'en') {
            return 'en';
        }
        // default locale: 'nl'.
        return 'nl';
    }

}
