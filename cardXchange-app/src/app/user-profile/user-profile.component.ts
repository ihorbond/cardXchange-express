import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
// import { Http } from '@angular/http';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [CardService]
})
export class UserProfileComponent implements OnInit {
cards;
message;
  constructor(private card: CardService) { }

  ngOnInit() {
    this.card.getCards().subscribe(result =>
              { console.log("USER-PROFILE CARDS: " + result);
                this.message = result.message;
                this.cards   = result.userInfo.cards;
              }
    )
  }

}