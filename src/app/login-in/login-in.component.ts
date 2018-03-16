import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

import { SocialUser } from "angular4-social-login";

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: [
    './login-in.component.css',
    '../../assets/css/style.css'
  ]
})
export class LoginInComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  fbLogin = false;
  googleLogin = false;
  
  LoginForm: FormGroup;
  constructor( private apiService: ApiService, private router: Router, private authService: AuthService ) { }

  ngOnInit() {
    this.LoginForm = new FormGroup(
      {      
	      'email': new FormControl(null, [Validators.required, Validators.email]),
	      'password': new FormControl(null, [Validators.required])
      }
  	); 
  	this.socialAuthentication(); 
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
	      	  console.log(userParams);
	      	  userParams["email"] = this.user.email;
	      	  userParams["password"] = "";
	      	  this.onFormSubmit(userParams);
	      }
      }
    });
  }
    
  loginInWithFB = function() {
  	this.fbLogin = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
;
  }
 
  loginInWithGoogle = function() {
    this.googleLogin = true;
  	this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
   
  onFormSubmit = function(LoginForm) {
      this.apiService.login(LoginForm)
      .subscribe(data => {
      	if( data ) {
	      	var jwtToken = data.token;
	      	var userId = data.id; 
	      	
	      	localStorage.setItem( userId, jwtToken );
	      	localStorage.setItem( "HRMS_current_user", userId );
	      	
	        this.router.navigate(['home']);
	    }
	    else {
	    	this.router.navigate(['']);
	    }
      }, error => this.errorMessage = error);
    return false;
  }

}
