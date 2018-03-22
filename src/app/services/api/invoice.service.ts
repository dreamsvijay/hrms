/* ######## Invoice API Service ######## */

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

/* --------------------------- Custom modules --------------------------- starts */

/* Importing auth service to get authentication information */
import { AuthUserService } from '../authentication/auth.service';

/* --------------------------- Custom modules --------------------------- ends */

@Injectable()
export class InvoiceService {

	  /* API base service url */
	  private ApiServiceUrl = 'http://localhost:8080/invoice';

	  /**
	   * Injecting Services into constructor
	   * HttpClient | for making service calls
	   * AuthUserService | to get authentication information
	   */
	  constructor( private http: HttpClient, private authUserService: AuthUserService ) { }
		
	    /** 
	     * Creating invoice service call
	     * @param invoice Object | invoice information
	     */
		createInvoice(invoice): Observable<any> {
				var invoiceParams = {
					message: invoice.message,
					invoice_date: invoice.date_of_invoice,
					foot_note: invoice.footer_note,
					payment_terms: invoice.payment_terms,
				    deleted_on: null,
				    created_by: this.authUserService.getUserId()
				};
				
			    return this.http.post('http://localhost:8080/invoice', invoiceParams).pipe(
			      tap(_ => console.log(`${invoice.message} created successfully`)),
			      catchError(this.handleError<any>('Invoice Creation Error'))
			    );
		}

	    /** 
	     * Updating invoice service call
	     * @param invoice Object | invoice information
	     */
		updateInvoice(invoice): Observable<any> {
				var invoiceParams = {
					name: invoice.company_name,
					first_name: invoice.first_name,
					last_name: invoice.last_name,
					title: invoice.title,
				    company_no: invoice.company_number,
					gst_no: invoice.gst_number,
				    email: invoice.email,
				    addresses: {
				    			invoice_address: {
				    				address_line_1: invoice.invoice_address_line1,
				    				address_line_2: invoice.invoice_address_line2,
				    				postcode: invoice.invoice_postcode,
				    				city: invoice.invoice_city,
				    				country: invoice.invoice_country
				    			}
				    },
				    contact_numbers: {
				    	phone: invoice.phone, 
				    	mobile_number: invoice.mobile_phone
				    },
				    updated_by: this.authUserService.getUserId(),
				};
			    return this.http.put('http://localhost:8080/invoice/' + invoice.customer_number, invoiceParams).pipe(
			      tap(_ => console.log(`${invoice.email} updated successfully`)),
			      catchError(this.handleError<any>('Invoice Updation Error'))
			    );
		}

	    /** 
	     * Delete invoice service call
	     * @param invoice Object | invoice information
	     */
		deleteInvoice(invoice): Observable<any> {
				var invoiceParams = {
				    deleted_by: this.authUserService.getUserId(),
				    deleted_on: Date.now()
				};
			    return this.http.put('http://localhost:8080/invoice/' + invoice.customer_number, invoiceParams).pipe(
			      tap(_ => console.log(`${invoice.email} deleted successfully`)),
			      catchError(this.handleError<any>('Invoice Deleted Error'))
			    );
		}
		
		/* Get invoices list service call */
		getInvoices(): Observable<any> {
		    return this.http.get(`${this.ApiServiceUrl}?deleted_on&sort=-createdAt`).pipe(
		      tap(_ => console.log(`Fetched invoices successfully`)),
		      catchError(this.handleError<any>('Invoices Fetch Error'))
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
