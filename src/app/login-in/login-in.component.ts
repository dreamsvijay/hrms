/* ######## Login module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';

/* Import forms module to use validation, controls etc. */
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* Importing route module to use route */
import { Router } from '@angular/router';

/* For social login integration */
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

/* For making service calls */
import { ApiService } from '../api.service';

/* --------------------------- Custom modules --------------------------- ends */

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: [
    './login-in.component.css',
    '../../assets/css/style.css'
  ]
})

export class LoginInComponent implements OnInit {

  private user: SocialUser; /* defining user as SocialUser object */
  private loggedIn: boolean; /* defining loggedIn status as boolean */
  fbLogin = false; /* defining fb login status as boolean */
  googleLogin = false; /* defining google login status as boolean */
  LoginForm: FormGroup; /* defining LoginForm as form group object */

  /*
   * Injecting required services into contructor
   * ApiService | for making api service calls
   * Router | for route navigation
   * AuthService | for authentication service
   * */
  constructor( private apiService: ApiService, private router: Router, private authService: AuthService ) { }

  ngOnInit() {
	/* Initiating loginform formgroup variables */ 
    this.LoginForm = new FormGroup(
      {      
	      'email': new FormControl(null, [Validators.required, Validators.email]),
	      'password': new FormControl(null, [Validators.required])
      }
  	); 
    
    /* Initiating social authentication */
  	this.socialAuthentication(); 
  }

  /**
   * Function to social authentication for login
   * TODO : make it as common common
   */
  socialAuthentication = function() {
	/* Getting social login response */
  	this.authService.authState.subscribe((user) => {
      this.user = user; /* assigning response user to private user variable */
      this.loggedIn = (user != null); /* setting loggedIn status */
      
      /* Checing whether uesr clicked the social login button to invoke the function */
      if( this.fbLogin || this.googleLogin ) {
    	  
	      var userParams = new Object(); /* defining user params object to have user information */
	      
	      /* Checking user exist */
	      if( this.user ) {
	      	  userParams["email"] = this.user.email; /* Setting user's email to private variable */
	      	  /* TODO: have to analyze and change the code logic */
	      	  userParams["password"] = ""; /* Setting user's password to private variable */
	      	  
	      	  /* Passing user information for signup */
	      	  this.onFormSubmit(userParams);
	      }
      }
    });
  }
  
  /* Facebook login invoking function when user clicks social login button */
  loginInWithFB = function() {
  	this.fbLogin = true; /* Setting facebook login status */
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID); /* Service call to Facebook login */
  }
 
  /* Google login invoking function when user clicks social login button */
  loginInWithGoogle = function() {
    this.googleLogin = true; /* Setting google login status */
  	this.authService.signIn(GoogleLoginProvider.PROVIDER_ID); /* Service call to Google login */
  }

  /*
   * Function for login form submit
   * @param LoginForm Object | login form user information
   */
  onFormSubmit = function(LoginForm) {
	  /* Making service call to login */
      this.apiService.login(LoginForm).subscribe(data => {
      	if( data ) {
	      	var jwtToken = data.token; /* Setting JWT token to private variable */
	      	var userId = data.id; /* Setting userId to private variable */
	      	
	      	localStorage.setItem( userId, jwtToken ); /* Setting JWT token for the respective user in browser local storage */
	      	localStorage.setItem( "HRMS_current_user", userId ); /* Setting current user ID in browser local storage */
	      	
	      	/* Navigating to dashboard page after successful login */
	        this.router.navigate(['home']);
	    }
	    else {
	    	/* Navigating to login page after usuccessful login */
	    	this.router.navigate(['']);
	    }
      }, error => this.errorMessage = error);
    return false;
  }

}
