import { Component, OnInit }    from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { NgForm }               from '@angular/forms';
import { Router }               from '@angular/router';
import { SignupComponent }      from '../signup/signup.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.min.css'],
  providers: [AuthorizationService, SignupComponent]
})

export class LoginComponent implements OnInit {
  user: any;
  message: string;
  loginInfo: any = {
    loginEmail: '',
    loginPassword: ''
  }
  signupInfo: any = {
    fullName: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private auth: AuthorizationService) { }

  ngOnInit() {
    // check if user already logged in
    this.auth.isLoggedIn()
    .subscribe(user => {
                         this.user  = user;
                         this.message = null;
                         console.log(user);
                         //if logged in => go home
                         if (user) this.router.navigate[('')];
                         });
  }

  signup(form: NgForm) {
    this.signupInfo.fullName = form.value.fullName;
    this.signupInfo.email    = form.value.email.toLowerCase();
    this.signupInfo.password = form.value.password;
    console.log(this.signupInfo);
    this.auth.signup(this.signupInfo)
    .subscribe((user => { this.user  = user;
                          this.message = null;
                          if (user) this.router.navigate(['']);
                         }),
               (err) =>   this.message = err   );
  }


  login(form: NgForm) {
    this.loginInfo.loginEmail    = form.value.loginEmail.toLowerCase();
    this.loginInfo.loginPassword = form.value.loginPassword;
    console.log(this.loginInfo);
    this.auth.login(this.loginInfo)
    .subscribe((user => {
                          this.user  = user;
                          this.message = null;
                          console.log(user);
                          if (user !== null) {
                            this.router.navigate(['']);
                          }
                        }),
                          (err) => this.message = err
                        );
  }

  toggleLogin(event) {
   const option = event.target.id;

    if (option === 'emailA') {
      $('#emailLi').toggleClass('inversed-li');
      $('.email-login').slideToggle("fast");
      // $('.nav-tabs > li').removeClass('inversed-li');
    }

    if (option === 'linkedInA') {
      $('#linkedInLi').toggleClass('inversed-li');
      $('.linkedin-login').slideToggle("fast");
    }
    if (option === 'patternA') {
      $('#patternLi').toggleClass('inversed-li');
      $('.pattern-login').slideToggle("fast");
    }
    if (option === 'signupA') {
      $('#signupLi').toggleClass('inversed-li');
      $('.signup-login').slideToggle("fast");
    }
  }


}
