/* ######## Create invoice module component ######## */

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

/* For authentication information */
import { AuthUserService } from '../services/authentication/auth.service';

/* Include invoice service */
import { InvoiceService } from '../services/api/invoice.service';

/* --------------------------- Custom modules --------------------------- ends */

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

	invoiceForm: FormGroup; /* defining invoiceForm as form group object */
	notify = { 'status' : false, 'message' : '' }; /* Set notify default flag status for notification alert */
	invoicePopulateParams = {}; /* Populate invoice information for edit */
	isUpdate = "Save"; /* Setting flag to check whether its new invoice or existing customer */
	isDelete = false; /* Setting flag to delete customer */

	  /*
	   * Injecting required services into contructor
	   * Router | for route navigation
	   * InvoiceService | for making invoice api service calls
	   * */
  constructor( private authUserService: AuthUserService, private router: Router, private invoiceService: InvoiceService ) { }

  ngOnInit() {
		/* Initiating invoiceForm formgroup variables */ 
		this.invoiceForm = new FormGroup({
			'date_of_invoice': new FormControl(),
			'payment_terms': new FormControl('', Validators.required),
			'message': new FormControl('',CustomValidators.number),
			'description': new FormControl(), 
			'date': new FormControl(),
			'quantity': new FormControl(),
			'unit': new FormControl(),
			'unit_price': new FormControl('',CustomValidators.email), 
			'cgst': new FormControl('', CustomValidators.number),
			'sgst': new FormControl('', CustomValidators.number),
			'total': new FormControl(),
			'footer_note': new FormControl()
		});
  }

	/* User logout */
	/* TODO: have to make it as service call */
	onLogout = function() {
	  	/* User logout */
	    this.authUserService.postLogout();
	  	/* Navigating to login page after logout */
	    this.router.navigate(['']);
	}
	
	/* To reset form values */
    onCancel = function() {
		this.invoiceForm.reset();
		this.isUpdate = "Save";
	}
    
	/**
	 * Function on successful service call
	 * @param data Object | Response from invoice service
	 */
	onInvoiceServiceResponse = function(data) {
      	if( data ) {
      		/* Navigating to invoice page after successful creation of invoice */
      		this.router.navigate(['create-invoice']);
			
			/* Set nofify message on success */
			this.notify.message = "Your invoice has been successfully updated.";
			if ( this.isUpdate == "Save" ) {
				this.notify.message = "Your invoice has been successfully created.";
			}
			
			if ( this.isDelete ) {
				this.notify.message = "Your invoice has been successfully deleted.";
			}
			
			/* To reset form values */
			this.onCancel();
			
			this.notify.status = true; /* To set notify flag to alert success message */
      	}
      	else {
      		/* Navigating to customer page after unsuccessful creation of customer */
      		this.router.navigate(['create-invoice']);
      	}
	}
	
	  /*
	   * Function for invoice form submit
	   * @param invoiceForm Object | invoice information
	   */
	onFormSubmit = function(){
		this.notify.status = false; /* Reset notify status flag */
		if( !this.invoiceForm.value.customer_number ) {
			/* Making service call to invoice creation */
		    this.invoiceService.createInvoice( this.invoiceForm.value )
		      .subscribe(data => this.onInvoiceServiceResponse(data), error => this.errorMessage = error);
		    return false;
		}
		else {
			/* Making invoice call to invoice updation */
		    this.invoiceService.updateIvoice( this.invoiceForm.value )
		      .subscribe(data => this.onInvoiceServiceResponse(data), error => this.errorMessage = error);
		    return false;			
		}
	}
	
	onDelete() {
		this.isDelete = false; /* Reset delete flag */
		this.notify.status = false; /* Reset notify status flag */
		if( this.invoiceForm.value.customer_number ) {
			this.isDelete = true;
			/* Making service call to invoice deletion */
		    this.invoiceService.deleteInvoice( this.invoiceForm.value )
		      .subscribe(data => this.onInvoiceServiceResponse(data), error => {});
		    return false;			
		}
	}
}
