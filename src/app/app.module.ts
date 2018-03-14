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
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module


import { AppRoutingModule } from './app-routing-module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService } from './auth-guard.service';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginInComponent,
    DashboardComponent    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule, // <-- #2 add to @NgModule imports
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ApiService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { } 