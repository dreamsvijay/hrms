import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
    this.LoginForm = new FormGroup({      
      email: new FormControl(),
      password: new FormControl()     

    })     
  }
  onFormSubmit(LoginForm) {
    console.log(LoginForm);
    return false;
  }

}
