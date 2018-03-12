import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css',
    '../../assets/css/style.css'
  ]
})
export class SignUpComponent implements OnInit {
 
  signupForm: FormGroup;
  constructor() {
    
   }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirm_password: new FormControl()
      
    })   
    
  }

  onFormSubmit(signupForm){

    console.log(signupForm);
    return false;
  }
  

}
