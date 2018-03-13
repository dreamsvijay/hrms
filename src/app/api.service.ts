import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  signup(user) {
    return this.http.post('http://localhost:8080/users/signup', user);
  }

  login(user) {
    return this.http.post('http://localhost:8080/users/login', user);
  }

} 