import { Component, OnInit } from '@angular/core';
import { CardService }       from '../card.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  providers: [CardService]
})
export class EditCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  editCard(id) {
    
  }

}
