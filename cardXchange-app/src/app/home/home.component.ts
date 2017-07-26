import { Component, OnInit } from '@angular/core';
import { CardService }       from '../card.service';

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

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.cardService.getCards().subscribe(result =>
              {
                this.message = result.message;
                this.cards   = result.userInfo.cards;
                this.user    = result.userInfo;
                this.getDefaultCard();
              }
    )
  }

  getDefaultCard() {
    this.cards.forEach(oneCard => {
      if (oneCard.default) {
        this.defaultCard = oneCard;
      }
    });
  }

}
