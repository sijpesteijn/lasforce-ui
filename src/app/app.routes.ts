import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'animations/animation_edit', pathMatch: 'full' },
    { path: 'animations', loadChildren: './animation#AnimationModule'},
    { path: 'shows', loadChildren: './show#ShowModule'},
    { path: 'login', component: LoginComponent},
    { path: '**', component: NoContentComponent },
];
