import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthorizationService]

})
export class LoginComponent implements OnInit {
  user: any;
  error: string;
  loginInfo: any = {
    loginEmail: '',
    loginPassword: ''
  }
  constructor(private auth: AuthorizationService) { }

  ngOnInit() {
    //check if user already logged in
    this.auth.isLoggedIn()
    .subscribe(user => { this.user  = user;
                         this.error = null });
  }

  login(form: NgForm) {
    this.loginInfo.loginEmail    = form.value.loginEmail.toLowerCase();
    this.loginInfo.loginPassword = form.value.loginPassword;
    console.log(this.loginInfo);
    this.auth.login(this.loginInfo)
    .subscribe((user => { this.user  = user;
                          this.error = null; }),
               (err) =>   this.error = err   );
  }

  logout() {
   this.auth.logout()
   .subscribe(() => { this.user  = null;
                      this.error = null; },
           (err) =>   this.error = err)
  }


}