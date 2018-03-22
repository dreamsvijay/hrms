import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: [
              './invoice.component.css'
              ]
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
	/* Loading script files at run time */
	//this.loadScript('../../assets/js/app.js');	  
  }

  /**
   * Loading scripts at run time functionality
   * @param url String | script path to load at runtime
   */
  public loadScript(url) {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
}
