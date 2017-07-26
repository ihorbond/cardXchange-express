import { Component, OnInit }     from '@angular/core';
import { AuthorizationService }  from './authorization.service';
import { NgForm }                from '@angular/forms';
import { NgClass }               from '@angular/common';
import { Router }                from '@angular/router';
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
  title = 'cardXchange';
  loginSignup: boolean = false;
  sideMenu: boolean = false;
  user: any;
  message: string;

  constructor(
              private auth: AuthorizationService,
              private router: Router
            ) {}

  ngOnInit() {
    //check if user already logged in
    this.auth.isLoggedIn()
    .subscribe(user => { this.user  = user;
                         this.message = null;
                         console.log(user);
                         if(!user) this.router.navigate[('login')];
                        });
  }


 logoClicked() {
   if (this.user) this.router.navigate(['']);
     else this.router.navigate(['login']);
 }

  logout() {
   this.auth.logout()
   .subscribe(() => { this.user  = null;
                      this.message = null;
                     },
           (err) =>   this.message = err);
  this.router.navigate(['login']);
  this.showMenu();
  }

  about() {
    this.router.navigate(['about']);
    this.showMenu();
  }

  help() {
    this.router.navigate(['help']);
    this.showMenu();
  }

   showMenu() {
     if(!this.sideMenu) {
       this.sideMenu = true;
     $(".sidenav").width(140);
     $(".page-content").css("opacity", "0.5");
  }
  else {
    this.sideMenu = false;
  $(".sidenav").width(0);
  $(".page-content").css("opacity", "1");
  }
}
}
