/* ######## Login module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';

/* Importing route module to use route */
import { Router } from '@angular/router';

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

/* For making service calls */
import { ApiService } from '../api.service';

/* --------------------------- Custom modules --------------------------- ends */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
  				'./dashboard.component.css',
  			 	'../../assets/fonts/font-awesome.min.css',
  			 	'../../assets/plugins/morris/morris.css', 
  			 	'../../assets/css/style.css',
  			 ]
})

export class DashboardComponent implements OnInit {

  /*
   * Injecting required services into contructor
   * ApiService | for making api service calls
   * Router | for route navigation
   * */
  constructor( private apiService: ApiService, private router: Router ) { }

  ngOnInit() {
	/* Loading script files at run time */
	this.loadScript('../../assets/js/app.js');
	this.loadScript('../../assets/js/chart.js');
	this.loadScript('../../assets/js/morris.min.js');
	this.loadScript('../../assets/js/raphael-min.js');
	this.loadScript('../../assets/js/app.js');					
  }

  /* User logout */
  onLogout = function() {
	  /* Making service call to logout */
      this.apiService.logout().subscribe(data => {
      	if( data.id ) {
      		/* Removing JWT token & current userid from browser local storage */
        	localStorage.removeItem(data.id);
        	localStorage.removeItem("HRMS_current_user");
        }
      	/* Navigating to login page after logout */
        this.router.navigate(['']);
      }, error => this.errorMessage = error);
    return false;
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
