import { Component, OnInit, ElementRef } from '@angular/core';
import { CardService }                   from '../card.service';
import { NgForm }                        from '@angular/forms';
import { UserProfileComponent }          from '../user-profile/user-profile.component';
import { NgClass }                       from '@angular/common';
// import { QRcode } from '../../assets/QR/qrcode.js';
// declare var QRious: any;
declare var $:any;
@Component({
  selector:    'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls:   ['./add-card.component.min.css'],
  providers:   [CardService, UserProfileComponent]
})
export class AddCardComponent implements OnInit {

isHidden: boolean = true;
message: string;
numberOfCards: number;

  constructor(
              private card: CardService,
              private el: ElementRef,
              private userProfile: UserProfileComponent
            ) { }

  addCard(form: NgForm) {
    if (this.numberOfCards >= 3) {
        this.message = "You've reached the limit of 3 cards :( Please remove other card first";
        return;
    }
    this.isHidden = true;
    let newCard = {
      fullName:    form.value.fullName,
      companyName: form.value.companyName,
      position:    form.value.position,
      phoneNum:    form.value.phoneNum,
      email:       form.value.email,
      description: form.value.description,
      linkedIn:    form.value.linkedIn,
      QRcode:      this.generateQR()
    }
    console.log(newCard);
    this.card.addCard(newCard).subscribe(
    result => { this.message = result.message;
                this.userProfile.ngOnInit();
              }
    )
  }

    generateQR() {
    let qrcode = this.el.nativeElement.querySelector('#qr');
    return qrcode;
 }

 //hide show new card add form
   addNewCard() {
    if (!this.isHidden) this.isHidden = true;
    else this.isHidden = false;
   }
//check how many saved cards user already has
 checkCardsCount(id){
   $("qr").show();
 }

  ngOnInit() {

  }

}
