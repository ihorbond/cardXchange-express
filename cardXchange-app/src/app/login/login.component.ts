import { Component, OnInit }    from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { NgForm }               from '@angular/forms';
import { Router }               from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.min.css'],
  providers: [AuthorizationService, ]

})
export class LoginComponent implements OnInit {
  user: any;
  error: string;
  loginInfo: any = {
    loginEmail: '',
    loginPassword: ''
  }
  constructor(
    private router: Router,
    private auth: AuthorizationService) { }

  ngOnInit() {
    //check if user already logged in
    this.auth.isLoggedIn()
    .subscribe(user => { this.user  = user;
                         this.error = null;
                         //if logged in => go home
                         if (this.user) this.router.navigate[('')];
                         });
  }

  login(form: NgForm) {
    this.loginInfo.loginEmail    = form.value.loginEmail.toLowerCase();
    this.loginInfo.loginPassword = form.value.loginPassword;
    console.log(this.loginInfo);
    this.auth.login(this.loginInfo)
    .subscribe((user => { this.user  = user;
                          this.error = null;
                          if (this.user) this.router.navigate[('')];
                        }),
                          (err) =>   this.error = err
                        );
  }
}
