import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Localization service 
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css',
    '../../assets/css/style.css'
  ]
})
export class SignUpComponent implements OnInit {
  
  translate: TranslateService;
  signupForm: FormGroup;

  constructor( private apiService: ApiService, translate: TranslateService, private router: Router ) {
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
      	if( data ) {
      		this.router.navigate(['log-in']);
      	}
      	else {
      		this.router.navigate(['sign-up']);
      	}
      }, error => this.errorMessage = error);
    return false;
  }
  // Switching language 
  switchLanguage = (lang: string) => {
    this.translate.use(lang); 
  }
    

}
