import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [CardService]
})
export class ContactsComponent implements OnInit {
 contacts;
  constructor(private card: CardService) { }

  ngOnInit() {
    this.card.getContacts().subscribe(
      result => this.contacts = result
  )}

}
