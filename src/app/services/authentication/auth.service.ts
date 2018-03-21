/* ######## User authentication information Service ######## */

import { Injectable } from '@angular/core';

@Injectable()
export class AuthUserService {
  
  private token;
  private userId;
  private status: Boolean;
  
  constructor() {
	  /* Setting user logged-in informatino to browser local storage */
	  if( localStorage.getItem('HRMS_current_user') ) {
		  this.userId = localStorage.getItem('HRMS_current_user'); /* Get current userId */
		  this.token = localStorage.getItem( this.userId ); /* Get current userId */
	  }
  }
  
  /**
   * Post login functionality
   * @param jwtToken String | JWT token for further requests
   * @param userId | user's ID
   */
  postLogin( jwtToken, userId ) {
	  this.status = false;
	  if( jwtToken && userId ) {
		  localStorage.setItem( userId, jwtToken ); /* Setting JWT token for the respective user in browser local storage */
		  localStorage.setItem( "HRMS_current_user", userId ); /* Setting current user ID in browser local storage */
		  this.status = true;
	  }
	  return this.status;
  }
  
  /* Get user's ID */
  getUserId() {
	  return this.userId ? this.userId : false;
  }
  
  /* Get user's JWT token */
  getUserToken() {
	  return this.token ? this.token : false;
  }
  
  /* Post logout functionality */
  postLogout() {
	  this.status = false;
	  if( this.userId ) {
		  /* Removing JWT token & current userid from browser local storage */
		  localStorage.removeItem( this.userId );
		  localStorage.removeItem("HRMS_current_user");
		  this.status = true;
	  }
	  return this.status;
  }
  
  /* To check whether user logged-in or not */
  isLoggedIn() {
	  this.status = false;
	  if( this.userId && this.token ) {
		  this.status = true;
	  }
	  return this.status;
  }
}
