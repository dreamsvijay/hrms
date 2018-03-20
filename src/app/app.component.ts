/* ######## Root module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

/* For making service calls */
import { ApiService } from './api.service';

/* For translation/locale implementation */
import { TranslateService } from '@ngx-translate/core';

/* --------------------------- Custom modules --------------------------- ends */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  translate: TranslateService; /* defining translate as a private property  */
  

  /* Injecting API service and translate service in constructor */
  constructor(private apiService: ApiService, translate: TranslateService ) { 
    this.translate = translate;
    translate.setDefaultLang('en'); /* Setting default language */
  }

  /* Switching language */ 
  switchLanguage = (lang: string) => {  /* creating a new method */
    this.translate.use(lang); /* invoking `use()` to use the language */
  }

  ngOnInit() {}

} 