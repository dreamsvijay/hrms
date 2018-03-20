/* ######## For authentication and authorization ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

/* Importing API service for making service calls */
import { ApiService } from './api.service';

/* --------------------------- Custom modules --------------------------- ends */

@Injectable()
export class AuthGuardService implements CanActivate {

 	constructor(private apiService: ApiService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		
		//if (this.authService.isUserLoggedIn()) {
		
		/* Get current user from browser local storage to check login status */
		/*  TODO: have to make auth as a separate service */
		if ( localStorage.getItem("HRMS_current_user") ) {
			return true; 
		}
		
		//this.authService.setRedirectUrl(url);
		//this.router.navigate([ this.authService.getLoginUrl() ]);
		
		/* Redirecting to front/home page if not authenticated */
		this.router.navigate(['']);
		
		return false;
	}
}
