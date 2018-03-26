/* ######## Customer module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';

/* Import forms module to use validation, controls etc. */
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* Import Custom forms module to use validator  */
import { CustomValidators } from 'ng4-validators';

/* Importing route module to use route */
import { Router } from '@angular/router'; 

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

/* Include user service */
import { UserService } from '../services/api/user.service';

/* Include customer service */
import { CustomerService } from '../services/api/customer.service';

/* Importing auth service to get authentication information */
import { AuthUserService } from '../services/authentication/auth.service';

/* Import Customer model */
import { Customer } from '../models/customer';

/* --------------------------- Custom modules --------------------------- ends */

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: [
  				'./customer.component.css'
  			]
})

export class CustomerComponent implements OnInit {
	
	customers; /* defiing private variable to hold customer list */
	customerForm: FormGroup; /* defining customerForm as form group object */
	notify = { 'status' : false, 'message' : '' }; /* Set notify default flag status for notification alert */
	customerPopulateParams = {}; /* Populate customer information for edit */
	isUpdate = "Save"; /* Setting flag to check whether its new customer or existing customer */
	isDelete = false; /* Setting flag to delete customer */

		invoice_country: any; /*   Intialize country  */
		invoice_language: any; /*   Intialize Language  */
		payment_terms: any; /*   Intialize Payemtn Terms  */
		vat: any; /*   Intialize Vat  */
		countries = [{name: 'India'},{name: 'UK' }]; /* Assinging values to country dropdown  */
		languages = [{name: 'English'},{name: 'French' }]; /* Assinging values to language dropdown  */
		terms = [{name: '30 Days'},{name: '20 Days' }]; /* Assinging values to payment terms dropdown  */
		vats = [{name: '3.5 %'},{name: '4.5 %' }]; /* Assinging values to vat dropdown  */

	
	  /*
	   * Injecting required services into contructor
	   * UserService | for making user api service calls
	   * CustomerService | for making customer api service calls
	   * Router | for route navigation
	   * */
	constructor( private authUserService: AuthUserService, private userService: UserService, private customerService: CustomerService, private router: Router ) { }

	ngOnInit() {			

		/* Initiating customerForm formgroup variables */ 
		this.customerForm = new FormGroup({			
			'customer_number': new FormControl(),
			'company_name': new FormControl('', Validators.required),
			'company_number': new FormControl('',CustomValidators.number),
			'gst_number': new FormControl(), 
			'title': new FormControl(),
			'first_name': new FormControl(),
			'last_name': new FormControl(),
			'email': new FormControl('',CustomValidators.email), 
			'phone': new FormControl('', CustomValidators.number),
			'mobile_phone': new FormControl('', CustomValidators.number),
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
		this.customerService.getCustomers().subscribe(data => {
	      	this.customers = data;	
	      }, error => { console.log(error) });
	}
	
	/* User logout */
	/* TODO: have to make it as service call */
	onLogout = function() {
      	/* User logout */
        this.authUserService.postLogout();
      	/* Navigating to login page after logout */
        this.router.navigate(['']);
 	}

	  /*
	   * Function for customer form submit
	   * @param customerForm Object | customer information
	   */
	onFormSubmit = function(){
		this.notify.status = false; /* Reset notify status flag */
		if( !this.customerForm.value.customer_number ) {
			/* Making service call to customer creation */
		    this.customerService.createCustomer( this.customerForm.value )
		      .subscribe(data => this.onCustomerServiceResponse(data), error => this.errorMessage = error);
		    return false;
		}
		else {
			/* Making service call to customer updation */
		    this.customerService.updateCustomer( this.customerForm.value )
		      .subscribe(data => this.onCustomerServiceResponse(data), error => this.errorMessage = error);
		    return false;			
		}
	}
	
	/* To reset form values */
    onCancel = function() {
		this.customerForm.reset();
		this.isUpdate = "Save";
	} 
	
	/**
  * Loading scripts at run time functionality
  * @param url String | script path to load at runtime
  */
	public loadScript(url) {
		let body = <HTMLDivElement>document.body;
		let script = document.createElement('script');
		script.innerHTML = '';
		script.src = url;
		script.async = true;
		script.defer = true;
		body.appendChild(script);
	}

	/**
	 * Function on successful service call
	 * @param data Object | Response from customer service
	 */
	onCustomerServiceResponse = function(data) {
      	if( data ) {
      		/* Navigating to customer page after successful creation of customer */
      		this.router.navigate(['customer']);
      		
      		/* Update customer list to get immediate affect in user's view */
			this.getCustomers();
			
			/* Set nofify message on success */
			this.notify.message = "Your company has been successfully updated.";
			if ( this.isUpdate == "Save" ) {
				this.notify.message = "Your company has been successfully created.";
			}
			
			if ( this.isDelete ) {
				this.notify.message = "Your company has been successfully deleted.";
			}
			
			/* To reset form values */
			this.onCancel();
			
			this.notify.status = true; /* To set notify flag to alert success message */
      	}
      	else {
      		/* Navigating to customer page after unsuccessful creation of customer */
      		this.router.navigate(['customer']);
      	}
	}

	onDelete() {
		this.isDelete = false; /* Reset delete flag */
		this.notify.status = false; /* Reset notify status flag */
		if( this.customerForm.value.customer_number ) {
			this.isDelete = true;
			/* Making service call to customer deletion */
		    this.customerService.deleteCustomer( this.customerForm.value )
		      .subscribe(data => this.onCustomerServiceResponse(data), error => {});
		    return false;			
		}
	}

	/* On select the customer */
	onSelect(customer): void {
		this.customerPopulateParams['customer_number'] = customer._id;
		this.customerPopulateParams['company_name'] = customer.name;
		this.customerPopulateParams['company_number'] = customer.company_no;
		this.customerPopulateParams['gst_number'] = customer.gst_no;
		this.customerPopulateParams['title'] = customer.title;
		this.customerPopulateParams['first_name'] = customer.first_name;
		this.customerPopulateParams['last_name'] = customer.last_name;
		this.customerPopulateParams['email'] = customer.email;
		this.customerPopulateParams['phone'] = customer.contact_numbers.mobile_number;
		this.customerPopulateParams['mobile_phone'] = customer.contact_numbers.phone;
		this.customerPopulateParams['invoice_address_line1'] = customer.addresses.invoice_address.address_line_1;
		this.customerPopulateParams['invoice_address_line2'] = customer.addresses.invoice_address.address_line_2;
		this.customerPopulateParams['invoice_postcode'] = customer.addresses.invoice_address.postcode;
		this.customerPopulateParams['invoice_city'] = customer.addresses.invoice_address.city;

		this.customerForm.patchValue(this.customerPopulateParams);
		this.isUpdate = "Update";
	}
}
	

