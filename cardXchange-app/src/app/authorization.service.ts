import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { HttpModule } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthorizationService {
BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(signupInfo) {
  return this.http.post(`${this.BASE_URL}/api/signup`, signupInfo)
  .map(res => res.json())
  .catch(this.handleError)
  }

 login(loginInfo) {
  return this.http.post(`${this.BASE_URL}/api/login`, loginInfo)
  .map(res => res.json())
  .catch(this.handleError)
 }

 isLoggedIn() {
   return this.http.get(`${this.BASE_URL}/api/loggedin`)
   .map(res => res.json())
   .catch(this.handleError)
 }

 logout() {
    return this.http.get(`${this.BASE_URL}/api/logout`)
    .map(res => res.json())
    .catch(this.handleError)
 }

}
