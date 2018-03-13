import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Localization service 
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

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
  name : string;
  email : string;
  password : string;
  confirm_password : string;

  constructor(private apiService: ApiService, translate: TranslateService) {
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

  onFormSubmit = function(signupForm){
          this.apiService.signup(signupForm)
      .subscribe(data => {
        alert(data._id);
      }, error => this.errorMessage = error);
    return false;
  }
  // Switching language 
  switchLanguage = (lang: string) => {  // <-- creating a new method
    this.translate.use(lang); // <-- invoking `use()`
  }
    

}
