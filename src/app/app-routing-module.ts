/* ######## Route Initialization ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { NgModule } from '@angular/core';

/* Importing route module to use route */
import { RouterModule, Routes } from '@angular/router';

/* For authentication and authorization */
import { AuthGuardService } from './services/authentication/auth-guard.service';

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */


/* Importing root module */
import { AppComponent } from './app.component';

/* Importing signup module */
import { SignUpComponent } from './sign-up/sign-up.component';

/* Importing login module */
import { LoginInComponent } from './login-in/login-in.component';

/* Importing dashboard module */
import { DashboardComponent } from './dashboard/dashboard.component';

/* Importing customer module */
import { CustomerComponent } from './customer/customer.component';

/* Importing invoice module */
import { InvoiceComponent } from './invoice/invoice.component';

/* --------------------------- Custom modules --------------------------- ends */

/* Initializing route constant */
const routes: Routes = [
	{ path: '', redirectTo: '/log-in', pathMatch: 'full' }, /* Redirecting to Home/login page for null path */
    { path: 'sign-up', component: SignUpComponent }, /* Signup page */
    { path: 'log-in', component: LoginInComponent }, /* Login page */
    { path: 'home', canActivate: [ AuthGuardService ], component: DashboardComponent }, /* Dashboard page */
    { path: 'customer', canActivate: [ AuthGuardService ], component: CustomerComponent }, /* Customer page */
    { path: 'invoice', canActivate: [ AuthGuardService ], component: InvoiceComponent } /* Invoice page */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], /* Initializing routes */
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
