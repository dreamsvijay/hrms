/* ######## User API Service ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Injectable } from '@angular/core';

/* For making api calls */
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

/* For making api calls observable */
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

/* --------------------------- Predefined/third party modules --------------------------- ends */

@Injectable()
export class UserService {

  /* API base service url */
  private ApiServiceUrl = 'http://localhost:8080';

  /**
   * Injecting Services into constructor
   * HttpClient | for making service calls
   */
  constructor(private http: HttpClient) { }

    /** 
     * User signup service call
     * @param user Object | user information 
     */
	signup(user): Observable<any> {
	    return this.http.post('http://localhost:8080/users/signup', user).pipe(
	      tap(_ => console.log(`${user.email} signed up successfully`)),
	      catchError(this.handleError<any>('User Signup Error'))
	    );
	}

	 /* User login service call */
	 login(user): Observable<any> {
	    return this.http.post(`${this.ApiServiceUrl}/users/login`, user).pipe(
	      tap(_ => console.log(`${user.email} logged in successfully`)),
	      catchError(this.handleError<any>('User Login Error'))
	    );
	 }

	/** 
	  * Check user email-id available or not service call
	  * @param emailId String | user email-id 
	  */
	isEmailIdAvailable(emailId):Observable<any> {
		    return this.http.get(`${this.ApiServiceUrl}/users/check_email?email=${emailId}`).pipe(
		      catchError(this.handleError<any>('Checking ${emailId} is available or not failed'))
		    );
	}
    
    /* Service call log */
	private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {
	
	      // TODO: send the error to remote logging infrastructure
	      console.error(error); // log to console instead
	
	      // TODO: better job of transforming error for user consumption
	      console.log(`${operation} failed: ${error.message}`);
	
	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	}
} 