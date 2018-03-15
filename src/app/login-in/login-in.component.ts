import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: [
    './login-in.component.css',
    '../../assets/css/style.css'
  ]
})
export class LoginInComponent implements OnInit {

  LoginForm: FormGroup;
  constructor( private apiService: ApiService, private router: Router ) { }

  ngOnInit() {
    this.LoginForm = new FormGroup(
      {      
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    }
  )     
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
