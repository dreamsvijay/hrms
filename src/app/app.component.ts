import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { ApiService } from './api.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  translate: TranslateService; // <-- defining translate as a private property
  

  // Injecting Common service and translate service in constructor 
  constructor(private apiService: ApiService, translate: TranslateService ) { 
    this.translate = translate;
    translate.setDefaultLang('en');
  }

  Repdata;
  valbutton = "Save";
  

// Switching language 
  switchLanguage = (lang: string) => {  // <-- creating a new method
    this.translate.use(lang); // <-- invoking `use()`
  }

  ngOnInit() {}

} 