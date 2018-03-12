import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css',
    '../../assets/css/style.css'
  ]
})
export class SignUpComponent implements OnInit {
 
  title:string;
  constructor() {
    this.title = "Signup";  
   }

  ngOnInit() {
      
  }

}
