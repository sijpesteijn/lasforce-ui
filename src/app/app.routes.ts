import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'animations/list', pathMatch: 'full' },
    { path: 'animations', loadChildren: './animation#AnimationModule'},
    { path: 'login', component: LoginComponent},
    { path: '**', component: NoContentComponent },
];
