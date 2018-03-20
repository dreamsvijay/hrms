/* ######## Customer module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';

/* Import forms module to use validation, controls etc. */
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* Importing route module to use route */
import { Router } from '@angular/router';

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

import { ApiService } from '../api.service';

/* --------------------------- Custom modules --------------------------- ends */

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: [
  				'./customer.component.css',
  				'../../assets/css/select2.min.css',
  				'../../assets/css/style.css'
  			]
})

export class CustomerComponent implements OnInit {
	
	customers; /* defiing private variable to hold customer list */
	customerForm: FormGroup; /* defining customerForm as form group object */
	notify = false; /* Set notify default flag status for notification alert */
	
	  /*
	   * Injecting required services into contructor
	   * ApiService | for making api service calls
	   * Router | for route navigation
	   * */
	constructor( private apiService: ApiService, private router: Router ) { }

	ngOnInit() {
		
		/* Initiating customerForm formgroup variables */ 
		this.customerForm = new FormGroup({
			'customer_number': new FormControl(),
			'company_name': new FormControl(null, Validators.required),
			'company_number': new FormControl(),
			'gst_number': new FormControl(), 
			'title': new FormControl(),
			'first_name': new FormControl(),
			'last_name': new FormControl(),
			'email': new FormControl(null, [Validators.required, Validators.email]), 
			'phone': new FormControl(),
			'mobile_phone': new FormControl(),
			'invoice_address_line1': new FormControl(),
			'invoice_address_line2': new FormControl(),
			'invoice_postcode': new FormControl(),
			'invoice_city': new FormControl(),
			'invoice_country': new FormControl(),
			'invoice_language': new FormControl(),
			'payment_terms': new FormControl(),
			'vat': new FormControl()
		});
    
		/* Invokig get customers function to load customer list */
		this.getCustomers();
  	}
 
	/* Making service call to get customers */
	getCustomers = function() {
		this.apiService.getCustomers().subscribe(data => {
	      	this.customers = data;	
	      }, error => { console.log(error) });
	}
	
	/* User logout */
	/* TODO: have to make it as service call */
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
	      }, error => { console.log(error) });
	      return false;
 	}

	  /*
	   * Function for customer form submit
	   * @param customerForm Object | customer information
	   */
	onFormSubmit = function(){
		
		/* Making service call to customer creation */
	    this.apiService.createCustomer(this.customerForm.value)
	      .subscribe(data => {
	      	if( data ) {
	      		/* Navigating to customer page after successful creation of customer */
	      		this.router.navigate(['customer']);
	      		
	      		/* Update customer list to get immediate affect in user's view */
				this.getCustomers();
				
				/* To reset form values */
				this.onCancel();
				
				this.notify = true; /* To set notify flag to alert success message */	      	}
	      	else {
	      		/* Navigating to customer page after unsuccessful creation of customer */
	      		this.router.navigate(['customer']);
	      	}
	      }, error => this.errorMessage = error);
	    return false;
	}
	
	/* To reset form values */
    onCancel = function() {
    	this.customerForm.reset();
    } 
}
