import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../security/authenticate.service';
import { AppEventService, TITLE, AppEvent } from '../app.service';


@Component({
    selector: 'login',
    template: require('./login.html'),
    styles: [require('./login.scss')]
})
export class LoginComponent {
    model: any = {
        username: 'gijs',
        password: 'gijs'
    };
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private events: AppEventService) { }

    ngOnInit() {
        this.events.emit(new AppEvent(TITLE, 'Login'));
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        localStorage.setItem('currentUser', 'me');
        this.router.navigate([this.returnUrl]);
        // this.authenticationService.login(this.model.username, this.model.password)
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.loading = false;
        //         });
    }
}
