import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { ApiService } from './api.service';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public modalRef: BsModalRef;
  
  constructor(private apiService: ApiService, private modalService: BsModalService) { }
  Repdata;
  valbutton = "Save";

  ngOnInit() {
    this.apiService.getUsers().subscribe(data => this.Repdata = data)
  }

  openModal(template: "template") {
    this.modalRef = this.modalService.show(template); // {3}
  }
  
  onSave = function (user, isValid: boolean) {
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
        alert(data.data);

        this.ngOnInit();
      }
        , error => this.errorMessage = error)

  }
  
  edit = function (kk) {
    this.id = kk._id;
    this.first_name = kk.first_name;
    this.last_name = kk.last_name;
    this.valbutton = "Update";
  }

  delete = function (id) {
    this.newService.deleteUser(id)
      .subscribe(data => { alert(data.data); this.ngOnInit(); }, error => this.errorMessage = error)
  }

} 