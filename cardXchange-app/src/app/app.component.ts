import { Component, OnInit }     from '@angular/core';
import { AuthorizationService }  from './authorization.service';
import { NgForm }                from '@angular/forms';
import { NgClass }               from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.min.css'],
  providers: [AuthorizationService]

})
export class AppComponent implements OnInit {
  title = 'cXc';
  sideMenu: boolean = false;
  user: any;
  error: string;
  loginInfo: any = {
    loginEmail: '',
    loginPassword: ''
  }

  constructor(private auth: AuthorizationService) {}
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
                      this.error = null;
                     },
           (err) =>   this.error = err);
           console.log(this.user);
  }

   showMenu() {
     if(!this.sideMenu) {
       this.sideMenu = true;
     $(".sidenav").css("width", 140);
     $("body").css("background-color", "rgba(0,0,0,0.4)");
  }
  else {
    this.sideMenu = false;
  $(".sidenav").css("width", 0);
  $("body").css("background-color", "white");
  }
}
}
