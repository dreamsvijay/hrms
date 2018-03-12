import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Localization service 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css',
    '../../assets/css/style.css'
  ]
})
export class SignUpComponent implements OnInit {
  
  translate: TranslateService; // <-- defining translate as a private property
  signupForm: FormGroup;

  constructor(translate: TranslateService) {
    this.translate = translate;
    translate.setDefaultLang('en');    
   }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirm_password: new FormControl()
      
    })   
    
  }

  onFormSubmit(signupForm){
    console.log(signupForm);
    return false;
  }
  // Switching language 
  switchLanguage = (lang: string) => {  // <-- creating a new method
    this.translate.use(lang); // <-- invoking `use()`
  }
    

}
