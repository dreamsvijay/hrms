import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  singup(user) {
    return this.http.post('http://localhost:8080/signup', user);
  }

  login(user) {
    return this.http.post('http://localhost:8080/login', user);
  }

} 