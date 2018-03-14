import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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
  token;
  userId;
  constructor( private apiService: ApiService, private router: Router ) { }

  ngOnInit() {
  
  	this.loadScript('../../assets/js/jquery-3.2.1.min.js');
	this.loadScript('../../assets/js/bootstrap.min.js');
  	this.loadScript('../../assets/plugins/morris/morris.min.js');
  	this.loadScript('../../assets/plugins/raphael/raphael-min.js');
  	this.loadScript('../../assets/js/app.js');
  	this.loadScript('../../assets/js/chart.js');
  }

  onLogout = function() {
      this.apiService.logout()
      .subscribe(data => {
      	if( data.id ) {
        	localStorage.removeItem(data.id);
        	localStorage.removeItem("HRMS_current_user");
        }
        this.router.navigate(['']);
      }, error => this.errorMessage = error);
    return false;
  }
  
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
