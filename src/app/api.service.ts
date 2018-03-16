import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  private ApiServiceUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  signup(user): Observable<any> {
    return this.http.post('http://localhost:8080/users/signup', user).pipe(
      tap(_ => console.log(`${user.email} signed up successfully`)),
      catchError(this.handleError<any>('User Signup Error'))
    );
  }

  login(user): Observable<any> {
    return this.http.post(`${this.ApiServiceUrl}/users/login`, user).pipe(
      tap(_ => console.log(`${user.email} logged in successfully`)),
      catchError(this.handleError<any>('User Login Error'))
    );
  }

  logout(): Observable<any> {
    var userId = localStorage.getItem("HRMS_current_user");
    var token = localStorage.getItem(userId);
    return this.http.get('http://localhost:8080/users/logout', { params: { token: token, userId: userId} }).pipe(
      tap(_ => console.log(`${userId} logged out successfully`)),
      catchError(this.handleError<any>('User Logout Error'))
    );
  }

	createCustomer(customer): Observable<any> {
		var customerParams = {
			name: customer.company_name,
			title: customer.title,
		    company_no: customer.company_number,
			gst_no: customer.gst_number,
		    email: customer.email,
		    addresses: {
		    			invoice_address: {
		    				address_line_1: customer.invoice_address_line1,
		    				address_line_2: customer.invoice_address_line2,
		    				postcode: customer.invoice_postcode,
		    				city: customer.invoice_city,
		    				country: customer.invoice_country
		    			}
		    },
		    contact_numbers: {
		    	phone: customer.phone, 
		    	mobile_number: customer.mobile_phone
		    }
		};
	    return this.http.post('http://localhost:8080/customers', customerParams).pipe(
	      tap(_ => console.log(`${customer.email} created successfully`)),
	      catchError(this.handleError<any>('Customer Creation Error'))
	    );
	}

	getCustomers(): Observable<any> {
	    return this.http.get(`${this.ApiServiceUrl}/customers?sort=-createdAt`).pipe(
	      tap(_ => console.log(`Fetched customers successfully`)),
	      catchError(this.handleError<any>('Customers Fetch Error'))
	    );
	}
    
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