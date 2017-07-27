import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

declare var $:any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.min.css'],
  providers: [CardService]
})
export class ContactsComponent implements OnInit {
 contacts: any;
 showNote: boolean = false;
  constructor(private card: CardService) { }

  ngOnInit() {
    this.card.getContacts().subscribe(result => {
      this.contacts = result.userInfo;
  });
}

//click button event
  addNote(id) {
    if(!this.showNote) {
      this.showNote = true;
    $('#note').width($('#oneCard').width());
    $('#note').height(50);
  }
  else {
    this.showNote = false;
    this.hideNote(id);
  }
}

//onblur event
  hideNote(id) {
    $('#note').width(0);
    $('#note').height(0);
  }

}
