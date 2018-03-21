/* ######## Customer API Service ######## */

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
export class CustomerService {

	  /* API base service url */
	  private ApiServiceUrl = 'http://localhost:8080';

	  /**
	   * Injecting Services into constructor
	   * HttpClient | for making service calls
	   */
	  constructor(private http: HttpClient) { }
		
	    /** 
	     * Creating customer service call
	     * @param customer Object | customer information
	     */
		createCustomer(customer): Observable<any> {
				var customerParams = {
					name: customer.company_name,
					first_name: customer.first_name,
					last_name: customer.last_name,
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

	    /** 
	     * Updating customer service call
	     * @param customer Object | customer information
	     */
		updateCustomer(customer): Observable<any> {
				var customerParams = {
					name: customer.company_name,
					first_name: customer.first_name,
					last_name: customer.last_name,
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
			    return this.http.put('http://localhost:8080/customers/' + customer.customer_number, customerParams).pipe(
			      tap(_ => console.log(`${customer.email} updated successfully`)),
			      catchError(this.handleError<any>('Customer Updation Error'))
			    );
		}
		
		/* Get customers list service call */
		getCustomers(): Observable<any> {
		    return this.http.get(`${this.ApiServiceUrl}/customers?sort=-createdAt`).pipe(
		      tap(_ => console.log(`Fetched customers successfully`)),
		      catchError(this.handleError<any>('Customers Fetch Error'))
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
