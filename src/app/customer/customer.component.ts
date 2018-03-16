import { Component, OnInit } from '@angular/core';
//Import the API for building a form
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: [
  				'./customer.component.css',
  				// '../../assets/css/dataTables.bootstrap.min.css',
  				'../../assets/css/select2.min.css',
  				// '../../assets/css/bootstrap-datetimepicker.min.css',
  				'../../assets/css/style.css'
  			]
})
export class CustomerComponent implements OnInit {
	
	customers;
	customerForm: FormGroup;
	notify = false;
	constructor( private apiService: ApiService, private router: Router ) { }

	ngOnInit() {
	   	// this.loadScript('../../assets/js/jquery-3.2.1.min.js');
		// this.loadScript('../../assets/js/bootstrap.min.js');
		// this.loadScript('../../assets/js/jquery.dataTables.min.js');
		// this.loadScript('../../assets/js/dataTables.bootstrap.min.js');
		// this.loadScript('../../assets/js/select2.min.js');
		// this.loadScript('../../assets/js/moment.min.js');
		// this.loadScript('../../assets/js/bootstrap-datetimepicker.min.js');
	  	// this.loadScript('../../assets/js/app.js');
	  	
		this.customerForm = new FormGroup({
			'customer_number': new FormControl(),
			// 'company_name': new FormControl(null, Validators.required),
			'company_name': new FormControl(),
			'company_number': new FormControl(),
			'gst_number': new FormControl(), 
			'title': new FormControl(),
			'first_name': new FormControl(),
			'last_name': new FormControl(),
			// 'email': new FormControl(null, [Validators.required, Validators.email]), 
			'email': new FormControl(), 
			'phone': new FormControl(),
			'mobile_phone': new FormControl(),
			'invoice_address_line1': new FormControl(),
			'invoice_address_line2': new FormControl(),
			'invoice_postcode': new FormControl(),
			'invoice_city': new FormControl(),
			//'invoice_country': new FormControl(),
			//'invoice_language': new FormControl(),
			//'payment_terms': new FormControl(),
			//'vat': new FormControl()
		});
    
		this.getCustomers();
  	}
 
	getCustomers = function() {
		this.apiService.getCustomers()
	      .subscribe(data => {
	      	this.customers = data;	
	      }, error => { console.log(error) });
	}
	
	onLogout = function() {
	      this.apiService.logout()
	      .subscribe(data => {
	      	if( data.id ) {
	        	localStorage.removeItem(data.id);
	        	localStorage.removeItem("HRMS_current_user");
	        }
	        this.router.navigate(['']);
	      }, error => { console.log(error) });
	      return false;
 	}

	onFormSubmit = function(){
	    this.apiService.createCustomer(this.customerForm.value)
	      .subscribe(data => {
	      	if( data ) {
	      		this.router.navigate(['customer']);
				this.getCustomers();
				this.onCancel();
				this.notify = true;
	      	}
	      	else {
	      		this.router.navigate(['customer']);
	      	}
	      }, error => this.errorMessage = error);
	    return false;
	}
	
    onCancel = function() {
    	this.customerForm.reset();
    } 
    
	// public loadScript(url) {
    //     let body = <HTMLDivElement> document.body;
    //     let script = document.createElement('script');
    //     script.innerHTML = '';
    //     script.src = url;
    //     script.async = true;
    //     script.defer = true;
    //     body.appendChild(script);
    // }
}
