 // Browser module 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// form and http module 

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Commonservice 
import { ApiService } from './api.service';

// Translate 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginInComponent } from './login-in/login-in.component';

// Intialize reactive forms
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing-module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService } from './auth-guard.service';
import { CustomerComponent } from './customer/customer.component';

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

import { AlertModule } from 'ngx-bootstrap';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("24558093658-cv6h5l1ck00u25e4ug8blisjoooeoej7.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("555959064799267")
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginInComponent,
    DashboardComponent,
    CustomerComponent    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SocialLoginModule.initialize(config),
    AlertModule.forRoot(),
  ],
  providers: [ApiService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { } 