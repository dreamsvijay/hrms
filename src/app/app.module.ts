/* ######## Root Module ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

/* Browser module */ 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Forms module */
import { FormsModule } from '@angular/forms';

/* Importing root module */
import { AppComponent } from './app.component';

/* For locale implementation */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/* Importing Http module for making service calls */
import { HttpClientModule, HttpClient } from '@angular/common/http';

/* Importing reactive forms module to create reactive forms */
import { ReactiveFormsModule } from '@angular/forms';

/* Importing social signup module for social login integration */
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

/* Importing alert module from bootstrap */
import { AlertModule } from 'ngx-bootstrap';

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */


import { EmailValidationDirective } from './directives/email-validation.directive';

/* Importing signup module */
import { SignUpComponent } from './sign-up/sign-up.component';

/* Importing login module */
import { LoginInComponent } from './login-in/login-in.component';

/* Importing dashboard module */
import { DashboardComponent } from './dashboard/dashboard.component';

/* Importing customer module */
import { CustomerComponent } from './customer/customer.component';

/* Importing alert module for common notification alert to all modules */
import { AlertNotificationComponent } from './alert-notification/alert-notification.component';

/* Importing User API service */
import { UserService } from './services/api/user.service';

/* Importing Customer API service */
import { CustomerService } from './services/api/customer.service';

/* Importing routing module for route navigation */
import { AppRoutingModule } from './app-routing-module';

/* Importing auth guard service for authentication and authorization */
import { AuthGuardService } from './services/authentication/auth-guard.service';

/* Importing auth service to get authentication information */
import { AuthUserService } from './services/authentication/auth.service';
import { InvoiceComponent } from './invoice/invoice.component';

/* --------------------------- Custom modules --------------------------- ends */

/* For laoding translatio files - starts */

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

/* For laoding translatio files - ends */

/* Initializing social login objects - starts */

let config = new AuthServiceConfig([
  /* Google Credentials */
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("24558093658-cv6h5l1ck00u25e4ug8blisjoooeoej7.apps.googleusercontent.com")
  },
  /* Facebook Credentials */
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("555959064799267")
  }
]);

/* Initializing social login objects - ends */

@NgModule({
  declarations: [
    AppComponent, /* Root module */
    SignUpComponent, /* Signup module */
    LoginInComponent, /* Login module */
    DashboardComponent, /* Dashboard module */
    CustomerComponent, /* Customer module */
    AlertNotificationComponent, /* Common alert notification module */
    EmailValidationDirective, InvoiceComponent,  /* Email validation directive  */
  ],
  imports: [
    AppRoutingModule, /* Route module for navigation */
    BrowserModule, 
    FormsModule, /* Forms module for creating/using forms and elements */
    ReactiveFormsModule, /* For creating reactive forms */
    HttpClientModule, /* For making request to service calls */
    
    /* For translation locale implementation - starts */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    /* For translation locale implementation - ends */
    
    SocialLoginModule.initialize(config), /* Initializing social logins */
    AlertModule.forRoot(), /* making alert modules available to all modules */
  ],
  providers: [	UserService, /* For accessing User API services */
              	CustomerService, /* For accessing Customer API services */
  				AuthGuardService, /* For authorization and authentication */
  				AuthUserService /* For getting authentication information */
  			],
  bootstrap: [AppComponent] /* Initializing root module */
})
export class AppModule { } 