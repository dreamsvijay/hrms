/* ######## Header module component ######## */

import { Component, OnInit } from '@angular/core';

/* Importing route module to use route */
import { Router } from '@angular/router';

/* For authentication information */
import { AuthUserService } from '../services/authentication/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authUserService: AuthUserService, private router: Router ) { }

  ngOnInit() {
  }

  /* User logout */
  /* TODO: have to make it as service call */
  onLogout = function () {
    /* User logout */
    this.authUserService.postLogout();
    /* Navigating to login page after logout */
    this.router.navigate(['']);
  }



}
