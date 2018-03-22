/* ######## Invoice module component ######## */

/* --------------------------- Predefined/third party modules --------------------------- starts */

import { Component, OnInit } from '@angular/core';

/* Importing route module to use route */
import { Router } from '@angular/router';

/* --------------------------- Predefined/third party modules --------------------------- ends */

/* --------------------------- Custom modules --------------------------- starts */

/* Include customer service */
import { InvoiceService } from '../services/api/invoice.service';

/* For authentication information */
import { AuthUserService } from '../services/authentication/auth.service';

/* --------------------------- Custom modules --------------------------- ends */

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: [
              './invoice.component.css'
              ]
})
export class InvoiceComponent implements OnInit {

	invoices; /* defiing private variable to hold invoice list */
	
	constructor( private invoiceService: InvoiceService, private authUserService: AuthUserService, private router: Router ) { }

	ngOnInit() {
		/* Invokig get invoices function to load invoice list */
		this.getInvoices();
	}
  
  /* Making service call to get invoices */
  getInvoices = function() {
		this.invoiceService.getInvoices().subscribe(data => {
	      	this.invoices = data;	
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
}
