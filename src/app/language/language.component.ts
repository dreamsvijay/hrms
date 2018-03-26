/* ######## Language module component ######## */

import { Component, OnInit } from '@angular/core';

/* For locale implementation */
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  translate: TranslateService; /* defining translate as a private property */

  constructor(translate: TranslateService) { }

  ngOnInit() {
  }

  /* Switching language */
  switchLanguage = (event) => {
    //console.log(event.target.value);
    if (event.target.value != null) {
      this.translate.use(event.target.value); /* Using language for locale implementation */
    }

  }

}
