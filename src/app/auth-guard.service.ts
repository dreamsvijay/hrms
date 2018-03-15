import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class AuthGuardService implements CanActivate {

 	constructor(private apiService: ApiService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		
		//if (this.authService.isUserLoggedIn()) {
		if ( localStorage.getItem("HRMS_current_user") ) {
			return true; 
		}
		
		//this.authService.setRedirectUrl(url);
		//this.router.navigate([ this.authService.getLoginUrl() ]);
		this.router.navigate(['']);
		
		return false;
	}
}
