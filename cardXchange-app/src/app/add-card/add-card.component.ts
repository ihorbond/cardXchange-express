import { Component, OnInit, ElementRef } from '@angular/core';
import { CardService }                   from '../card.service';
import { NgForm }                        from '@angular/forms';
import { UserProfileComponent }          from '../user-profile/user-profile.component';
import { NgClass }                       from '@angular/common';
import { Router }                        from '@angular/router';
import { EditCardComponent }             from '../edit-card/edit-card.component';
import { AuthorizationService }          from '../authorization.service';
import { FileUploader }                  from 'ng2-file-upload';
// import { QRcode } from '../../assets/QR/qrcode.js';

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
cardUrl: string;
imgUpload = new FileUploader({
  url: 'http://localhost:3000/api/profile/my-cards/add'
});

  constructor(
              private router: Router,
              private card: CardService,
              private el: ElementRef,
              private userProfile: UserProfileComponent,
              private auth: AuthorizationService
            ) { }

  ngOnInit() {
               this.auth.isLoggedIn()
               .subscribe(res => {
                 this.user = res;
                 this.cardUrl = `http://localhost:3000/api/contacts/add/${this.user._id}`;
               });
            }

  addCard(form: NgForm) {

    let newCard = {
      fullName:    form.value.fullName,
      companyName: form.value.companyName,
      position:    form.value.position,
      phoneNum:    form.value.phoneNum,
      email:       form.value.email,
      linkedIn:    form.value.linkedIn,
      qrcode:      $('#qr').html()
    }
console.log("NEW CARD: " + newCard.fullName);
if (this.imgUpload.queue.length === 0) {

  this.card.addCard(newCard)
  .subscribe(result =>
            {
              if (result.status === "OK") {
                this.router.navigate(['profile']);
              }
              else {
              this.message = result.message;
            }
            }
  )
}

else {
  this.imgUpload.onBuildItemForm = (item, form) => {
    //'newCard' has to match the req.body.... in DB
    console.log("NEW CARD: " + newCard);
    form.append('newCard', newCard);
  }

  this.imgUpload.onSuccessItem = (item, response) => {
      this.router.navigate(['profile']);
  }
  this.imgUpload.onErrorItem = (item, response) => {
    console.log(response);
    this.message = "Oops something went wrong :(";
  }

  this.imgUpload.uploadAll();

  }
}

  cancel() {
    this.router.navigate(['profile']);
  }

}
