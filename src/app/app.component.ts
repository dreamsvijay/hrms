import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  translate: TranslateService; // <-- defining translate as a private property
  

  // Injecting Common service and translate service in constructor 
  constructor(private apiService: ApiService, translate: TranslateService ) { 
    this.translate = translate;
    translate.setDefaultLang('en');
  }

  Repdata;
  valbutton = "Save";
  

// Switching language 
  switchLanguage = (lang: string) => {  // <-- creating a new method
    this.translate.use(lang); // <-- invoking `use()`
  }


// get all user data 
  ngOnInit() {
    this.apiService.getUsers().subscribe(data => this.Repdata = data)
  }

   // save function 
  onSave = function (user, isValid: boolean) {
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
        alert(data.data);

        this.ngOnInit();
      }
        , error => this.errorMessage = error)

  }
  // get the edit  data 
  edit = function (kk) {
    this.id = kk._id;
    this.first_name = kk.first_name;
    this.last_name = kk.last_name;
    this.valbutton = "Update";
  }


   // Delete  function 
  delete = function (id) {
    this.newService.deleteUser(id)
      .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)
  }

} 