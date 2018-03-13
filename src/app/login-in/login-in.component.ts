import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

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
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.LoginForm = new FormGroup({      
      email: new FormControl(),
      password: new FormControl()     

    })     
  }
  
  onFormSubmit = function(LoginForm) {
      this.apiService.login(LoginForm)
      .subscribe(data => {
        alert(data._id);
      }, error => this.errorMessage = error);
    return false;
  }

}
