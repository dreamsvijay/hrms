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
  
  translate: TranslateService; // <-- defining translate as a private property
  signupForm: FormGroup;
  name : string;
  email : string;
  password : string;
  confirm_password : string;
  forbiddenUsernames = ['Boomi', 'Nathan']; 
  constructor( private apiService: ApiService, translate: TranslateService, private router: Router ) {
	
    this.translate = translate;
    translate.setDefaultLang('en');    
   }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),      
      'password': new FormControl(null, [Validators.required]),
      'confirm_password': new FormControl(null,Validators.required)     
      
    })   
    
  }

forbiddenNames(control : FormControl):{[s:string]:boolean}{
    if (this.forbiddenUsernames.indexOf(control.value) !== -1){
      return { 'nameIsForbidden':true };
    }else{
      return { 'nameIsForbidden': false };
    }
  }

  
  onFormSubmit = function(signupForm){
          this.apiService.signup(signupForm)
      .subscribe(data => {
      	if( data ) {
          console.log(data);
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
