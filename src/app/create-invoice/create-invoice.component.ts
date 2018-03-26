/* ######## Create invoice module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';

/* Import forms module to use validation, controls etc. */
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

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

/* Include customer service */
import { CustomerService } from '../services/api/customer.service';

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
	invoiceNumber; /* Random invoice number */
	dueDate; /* Invoice due date */
	items;
	payment_terms: any; /*   Intialize Payemtn Terms  */
	unit: any; /*   Intialize Unit  */
	company_name: any; /*   Intialize Company name  */
	invoice_type: any; /*   Intialize Invoice  type  */
	invoice_as: any; /*   Intialize Invoice  as  */
	currency: any; /*   Intialize currency  as  */

	terms = [{ name: '30 Days' }, { name: '20 Days' }]; /* Assinging values to payment terms dropdown  */
	units = [{ name: 'Pcs' }, { name: 'Cm' }, { name:'Kg'}]; /* Assinging values to Units */
	company_names = [{ name: 'Dreamguys Technologies' }, { name: 'Cream Transport'}]; /* Assinging values to Company name */

	invoice_language: any; /*   Intialize Language  */
	languages = [{ name: 'English' }, { name: 'French' }]; /* Assinging values to language dropdown  */
	invoice_types = [{ name: 'Sales' }, { name: 'Sales excluding VAT' }]; /* Assinging values to language dropdown  */
	invoice_ass = [{ name: 'Visible coloumns' }, { name: 'Date, Qty, Unit, Unit Price' },{name:"Cream Transport"}]; /* Assinging values to language dropdown  */
	currencies = [{ name: 'Dollar' }, { name: 'Euro' }]; /* Assinging values to language dropdown  */


	
	  /*
	   * Injecting required services into contructor
	   * Router | for route navigation
	   * InvoiceService | for making invoice api service calls
	   * CustomerService | for making customer api service calls
	   * */
  constructor( private authUserService: AuthUserService, private router: Router, private invoiceService: InvoiceService, private customerService: CustomerService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
		
		this.invoiceNumber = this.generate();
		this.dueDate = new Date();
		this.dueDate = this.dueDate.setDate( this.dueDate.getDate() + 30 );
		
		/* Initiating invoiceForm formgroup variables */ 
		this.invoiceForm = new FormGroup({
			'estimate_uid': new FormControl( this.invoiceNumber ),
			'project_id': new FormControl( "5ab346414b00110dfc0422fa" ), /* TODO: have to get the customer id by selection */
			'due_date': new FormControl( this.dueDate ),
			'date_of_invoice': new FormControl(),
			'payment_terms': new FormControl(''),
			'message': new FormControl(''),
			'footer_note': new FormControl(),
			'items': this.formBuilder.array([ this.createItem() ]),
			'company_name':new FormControl(),
			'invoice_language':new FormControl(),
			'invoice_type':new FormControl()
		});
  }

  	createItem(): FormGroup {
		  return this.formBuilder.group({
			  description: '',
			  date: '',
			  quantity: '',
			  unit: '',
			  unit_price: '',
			  cgst: '',
			  sgst: '',
			  total: '',
		  });
  	}

  	addItem(): void {
  	  this.items = this.invoiceForm.get('items') as FormArray;
  	  this.items.push(this.createItem());
  	}
  	
  	removeItem( itemIndex ): void {
  	    // control refers to your formarray
  	    const control = <FormArray>this.invoiceForm.controls['items'];
  	    // remove the chosen row
  	    control.removeAt(itemIndex);
  	}
  	
	/**
	 * Function to get random number within limit
	 * @param min int | minimum limit
	 * @param max int | maximum limit
	 */
    getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /* Random generation invoice id */
    generate = function() {
        return this.number = this.getRandomInt(1, 9999) + Math.random().toString(36).substr(2, 5);
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
			
			this.router.navigate(['invoice']);
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
