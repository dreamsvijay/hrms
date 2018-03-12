 // Browser module 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// form and http module 
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Commonservice 
import { CommonService } from './common.service';

// Translate 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginInComponent } from './login-in/login-in.component';

import { AppRoutingModule } from './app-routing-module';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginInComponent    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, HttpModule, FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { } 