import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.min.css'],
  providers: [AuthorizationService]
})
export class SignupComponent implements OnInit {
   error: string;
   user: any;
   signupInfo: any = {
     fullName: '',
     email: '',
     password: ''
   }

  constructor(private auth: AuthorizationService) { }

  ngOnInit() {
    //check if user already logged in
    this.auth.isLoggedIn()
    .subscribe(user => { this.user  = user;
                         this.error = null });
  }

  signup(form: NgForm) {
    this.signupInfo.fullName = form.value.fullName;
    this.signupInfo.email    = form.value.email.toLowerCase();
    this.signupInfo.password = form.value.password;
    console.log(this.signupInfo);
    this.auth.signup(this.signupInfo)
    .subscribe((user => { this.user  = user;
                          this.error = null; }),
               (err) =>   this.error = err   );
  }

}
