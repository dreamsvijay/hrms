/* ######## Signup module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';

/* Import forms module to use validation, controls etc. */
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* For locale implementation */
import { TranslateService } from '@ngx-translate/core';

/* Importing route module to use route */
import { Router } from '@angular/router';


/* For social login integration */
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

import { EmailValidationDirective } from '../directives/email-validation.directive';

/* For making service calls */
import { UserService } from '../services/api/user.service';

/* --------------------------- Custom modules --------------------------- ends */

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css'
  ]
})
export class SignUpComponent implements OnInit {
  
  translate: TranslateService; /* defining translate as a private property */
  signupForm: FormGroup; /* defining signupForm as form group object */
  name : string; /* defining user name as string */
  email : string; /* defining user name as string */
  password : string; /* defining user name as string */
  confirm_password : string; /* defining user name as string */
  fbLogin = false; /* defining fb login status as boolean */
  googleLogin = false; /* defining google login status as boolean */
    
  private user: SocialUser; /* defining user as SocialUser object */
  private loggedIn: boolean; /* defining loggedIn status as boolean */
  
  /*
   * Injecting required services into contructor
   * UserService | for making user api service calls
   * TranslateService | for locale implementation
   * Router | for route navigation
   * AuthService | for authentication service
   * */
  constructor( private userService: UserService, translate: TranslateService, private router: Router, private authService: AuthService ) {
    this.translate = translate;
    translate.setDefaultLang('en'); /* Setting default language */    
   }

  ngOnInit() { 
	  /* Initiating signup formgroup variables */ 
	  this.signupForm = new FormGroup({
	      'name': new FormControl(null,Validators.required),
	      'email': new FormControl(null, [ Validators.required, Validators.email ]),      
	      'password': new FormControl(null, [ Validators.required ]),
	      'confirm_password': new FormControl(null, [ Validators.required ])
	  }, this.passwordMatchValidator);
	  
	  /* Initiating social authentication */
	  this.socialAuthentication();  
  }

  /* Custom validaiton for password mismatch */
  passwordMatchValidator(g: FormGroup) {
	   return g.get('password').value === g.get('confirm_password').value? null : {'mismatch': true};
  }
  

    
  /*
   * Function for signup form submit
   * @param signupForm Object | signup form user information
   */
  onFormSubmit = function(signupForm){
	  
	  /* Making service call to signup */
      this.userService.signup(signupForm).subscribe(data => {
	      if( data ) {
	    	  var message = "<strong>Well done!</strong> You have successfully signed up.";
	    	  /* Navigating to login page after successful signup */
	          this.router.navigate(['log-in'], message);
	      }
	      else {
	    	  /* Navigating to signup page after unsuccessful signup */
	    	  this.router.navigate(['sign-up']);
	      }
      }, error => this.errorMessage = error);
      return false;
  }
  
  /**
   * Function to social authentication for signup
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
		    	  /* checking and assigning user's firstname */
			      if( this.user.firstName )  {
			      	userParams["first_name"] = this.user.firstName
			      }
			      /* checking and assigning user's lastname */
			      if( this.user.lastName )  {
			      	userParams["last_name"] = this.user.lastName
			      }
			      /* checking and assigning user's email */
			      if( this.user.email )  {
			      	userParams["email"] = this.user.email
			      }
			      else {
			    	if( this.fbLogin ) {
			    		/* creating user's email with ID if fb doesn't provide email */
			    		userParams["email"] = this.user.id + "@facebook.com";
			    	}
			      } 
			      
			      /* Setting profile type*/
			      if( this.fbLogin ) {
			    	  userParams["profile_type"] = "Facebook";
			      }
			      if( this.googleLogin ) {
			    	  userParams["profile_type"] = "Google";
			      }
			      
			      /* Passing user information for signup */
		      	  this.onFormSubmit(userParams);
		      }
		      
		      /* Reset login status */
		      this.fbLogin = this.googleLogin = false;
	      }
    });
  }
  
  /* Google login invoking function when user clicks social login button */
  signInWithGoogle(): void {
    this.googleLogin = true; /* Setting google login status */
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID); /* Service call to Google login */
  }
 
  /* Facebook login invoking function when user clicks social login button */
  signInWithFB(): void {
    this.fbLogin = true; /* Setting facebook login status */
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID); /* Service call to Facebook login */
    
  }
 
  /* Invoking signout function */
  signOut(): void {
    this.authService.signOut(); /* Service call to social logout */
  }
  
  /* Switching language */
  /* TODO: have to make it as service call */
  // switchLanguage = (lang: string) => {
  //   this.translate.use(lang); /* Using language for locale implementation */
  // }

  



    

}
