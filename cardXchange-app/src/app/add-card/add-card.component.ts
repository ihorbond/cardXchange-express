import { Component, OnInit, ElementRef } from '@angular/core';
import { CardService } from '../card.service';
import { NgForm } from '@angular/forms';
// import { QRcode } from '../../assets/QR/qrcode.js';
// declare var QRious: any;
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  providers: [CardService]
})
export class AddCardComponent implements OnInit {

message: string;
numberOfCards: number;

  constructor(private card: CardService,
  private el: ElementRef) { }

  addCard(form: NgForm) {
    if (this.numberOfCards >= 3) {
      this.message = "You alredy have 3 cards. Pls remove other card first";
     return;
    }
    let newCard = {
      fullName: form.value.fullName,
      companyName: form.value.companyName,
      position: form.value.position,
      phoneNum: form.value.phoneNum,
      email: form.value.email,
      description: form.value.description,
      QRcode: this.generateQR()
    }
    console.log(newCard);
    this.card.addCard(newCard).subscribe(
    result => this.message = result
    )
  }

    generateQR() {
    let qrcode = this.el.nativeElement.querySelector('#qr');
    return qrcode;
 }
//check how many saved cards user already has
 checkCardsCount(id){

 }

  ngOnInit() {

  }

}
