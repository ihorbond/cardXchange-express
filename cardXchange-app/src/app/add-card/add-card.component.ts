import { Component, OnInit, ElementRef } from '@angular/core';
import { CardService }                   from '../card.service';
import { NgForm }                        from '@angular/forms';
import { UserProfileComponent }          from '../user-profile/user-profile.component';
import { NgClass }                       from '@angular/common';
import { Router }                        from '@angular/router';
import { EditCardComponent }             from '../edit-card/edit-card.component';
import { AuthorizationService }          from '../authorization.service';
// import { QRcode } from '../../assets/QR/qrcode.js';
// declare var QRious: any;
declare var $:any;

@Component({
  selector:    'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls:   ['./add-card.component.min.css'],
  providers:   [
    CardService,
    UserProfileComponent,
    EditCardComponent,
    AuthorizationService
  ]
})
export class AddCardComponent implements OnInit {
user: any;
message: string;

  constructor(
              private router: Router,
              private card: CardService,
              private el: ElementRef,
              private userProfile: UserProfileComponent,
              private auth: AuthorizationService
            ) { }

  addCard(form: NgForm) {
    let newCard = {
      fullName:    form.value.fullName,
      companyName: form.value.companyName,
      position:    form.value.position,
      phoneNum:    form.value.phoneNum,
      email:       form.value.email,
      description: form.value.description,
      linkedIn:    form.value.linkedIn,
      qrcode:      $('#qr').html()
    }
    console.log(newCard.qrcode);

    this.card.addCard(newCard)
    .subscribe(result =>
              {
                this.message = result.message;
              }
    )
    // this.router.navigate(['profile']);
  }

  ngOnInit() {
     this.auth.isLoggedIn()
     .subscribe(res => {
       this.user = res;
     })
  }

}
