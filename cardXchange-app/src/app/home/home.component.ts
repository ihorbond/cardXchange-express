import { Component, OnInit } from '@angular/core';
import { CardService }       from '../card.service';
// import { UserProfileComponent } from '../user-profile/user-profile.component';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CardService]
})
export class HomeComponent implements OnInit {
cards: any;
message: string;
user: any;
defaultCard: any;
qrcodeIcon: boolean = true;

  constructor(
    private cardService: CardService
  ) { }

  shareCard(id) {
    
  }

  enlargeQr() {
        $(".QRcode").html(this.defaultCard.QRcode);
      $(".QRcode").slideToggle("fast");
        // if (this.qrcodeIcon) {
        //   this.qrcodeIcon = false;
        //   $(`#QR2`).slideToggle("fast");
        //   $(`#QR`).slideToggle("slow");
        // }
        // else {
        //   this.qrcodeIcon = true;
        //   $(`#QR2`).slideToggle("slow");
        //   $(`#QR`).slideToggle("fast");
        // }
  }

  ngOnInit() {
    this.cardService.getCards().subscribe(result =>
              {
                this.message = result.message;
                this.cards   = result.userInfo.cards;
                this.user    = result.userInfo;
                this.getDefaultCard(result.userInfo.cards);
              }
    )
  }

  getDefaultCard(cards) {
    cards.forEach(oneCard => {
      if (oneCard.defaultSetting) {
        this.defaultCard = oneCard;
      }
    });
  }

}
