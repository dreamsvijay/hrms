import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Localization service 
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

import { SocialUser } from "angular4-social-login";

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
  fbLogin = false;
  googleLogin = false;
    
  private user: SocialUser;
  private loggedIn: boolean;
  
  constructor( private apiService: ApiService, translate: TranslateService, private router: Router, private authService: AuthService ) {
	
    this.translate = translate;
    translate.setDefaultLang('en');    
   }

  ngOnInit() { // Initiating formgroup variables 
    this.signupForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),      
      'password': new FormControl(null, [Validators.required]),
      'confirm_password': new FormControl(null,Validators.required)
    });
    this.socialAuthentication();  
  }


  // restrict names example function 

forbiddenNames(control : FormControl):{[s:string]:boolean}{
    if (this.forbiddenUsernames.indexOf(control.value) !== -1){
      return { 'nameIsForbidden':true };
    }else{
      return { 'nameIsForbidden': false };
    }
  }

  
  // Signup form submit 
  onFormSubmit = function(signupForm){
          this.apiService.signup(signupForm) // sending data to apiservice 
      .subscribe(data => {
      	if( data ) {
          console.log(data);
            var message = "<strong>Well done!</strong> You have successfully signed up.";
      		this.router.navigate(['log-in'], message); // navigating to login 
      	}
      	else {
          this.router.navigate(['sign-up']); // navigating to signup 
      	}
      }, error => this.errorMessage = error);
    return false;
  }
  
  socialAuthentication = function() {
	this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.fbLogin);
      if( this.fbLogin || this.googleLogin ) {
          console.log(this.user);
	      var userParams = new Object();
	      if( this.user ) {
		      if( this.user.firstName )  {
		      	userParams["first_name"] = this.user.firstName
		      }
		      if( this.user.lastName )  {
		      	userParams["last_name"] = this.user.lastName
		      }
		      if( this.user.email )  {
		      	userParams["email"] = this.user.email
		      }
		      else {
		      	userParams["email"] = this.user.id + "@facebook.com";
		      } 
	
			  userParams["profile_type"] = "Social Login";
	      	  console.log(userParams);
	      	  this.onFormSubmit(userParams);
	      }
	      this.fbLogin = this.googleLogin = false;
      }
    });
  }
  
  signInWithGoogle(): void {
    this.googleLogin = true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.fbLogin = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    
  }
 
  signOut(): void {
    this.authService.signOut();
  }
  
  // Switching language 
  switchLanguage = (lang: string) => {
    this.translate.use(lang); 
  }
    

}
