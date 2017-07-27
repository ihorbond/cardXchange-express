import { Component, OnInit } from '@angular/core';
import { CardService }       from '../card.service';

declare var $: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.min.css'],
  providers: [CardService]
})
export class ContactsComponent implements OnInit {
  contacts: any;
  showNote: boolean = false;
  flipped:  boolean = false;
  message:  string;
  keyword:  string;

  constructor(private card: CardService) { }

  ngOnInit() {
    this.card.getContacts().subscribe(result => {
      this.contacts = result.userInfo;
    });
  }

  saveNote(id) {
    let note = $(`#notes${id}`).val();
    console.log(note);
    this.card.updateNote(id, note)
      .subscribe(res => {
        this.message = res.message;
      });
    this.flip(id);
  }

  flip(id) {
    $(`#card${id}`).toggleClass("flipped");
  }

  cancelNote(id) {
    // console.log(this.contacts);
    this.flip(id);
  }

  expandContact(id) {
    $(`#contact${id}`).slideToggle("fast");
  }


}
