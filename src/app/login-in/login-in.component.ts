import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: [
    './login-in.component.css',
    '../../assets/css/style.css'
  ]
})
export class LoginInComponent implements OnInit {

    title:string;
  constructor() { }

  ngOnInit() {
    this.title = "Login";
  }

}
