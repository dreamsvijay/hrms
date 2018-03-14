import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token;
  userId;
  constructor( private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe( (params: Params) => {
	    this.token = params.token;
	    this.userId = params.userId;
	});
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
}
