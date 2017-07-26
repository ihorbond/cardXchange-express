import { Component, OnInit }    from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { NgForm }               from '@angular/forms';
import { Router }               from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.min.css'],
  providers: [AuthorizationService]
})
export class SignupComponent implements OnInit {

  constructor(
    private auth: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
    //check if user already logged in
  }


}
