/* ######## Login module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';

/* Importing route module to use route */
import { Router } from '@angular/router';

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

/* For making service calls */
import { UserService } from '../services/api/user.service';

/* For authentication information */
import { AuthUserService } from '../services/authentication/auth.service';

/* --------------------------- Custom modules --------------------------- ends */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
  				'./dashboard.component.css',
  			 	'../../assets/plugins/morris/morris.css'
  			 ]
})

export class DashboardComponent implements OnInit {

  /*
   * Injecting required services into contructor
   * UserService | for making user api service calls
   * Router | for route navigation
   * */
  constructor( private authUserService: AuthUserService, private userService: UserService, private router: Router ) { }

  ngOnInit() {
	/* Loading script files at run time */	
	this.loadScript('../../assets/js/chart.js');
  }

	/* User logout */
	/* TODO: have to make it as service call */
	onLogout = function() {
    	/* User logout */
      this.authUserService.postLogout();
    	/* Navigating to login page after logout */
      this.router.navigate(['']);
	}
  
  /**
   * Loading scripts at run time functionality
   * @param url String | script path to load at runtime
   */
  public loadScript(url) {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
}
