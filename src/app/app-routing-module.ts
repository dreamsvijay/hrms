import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginInComponent } from './login-in/login-in.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'log-in', component: LoginInComponent }, 
    { path: 'home', component: AppComponent }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
