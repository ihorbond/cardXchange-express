import { Component, OnInit, NgModule } from '@angular/core';
import { CardService }       from '../card.service';
import { NgForm }            from '@angular/forms';
// import { AddCardComponent}   from '../add-card/add-card.component';
import { EditCardComponent } from '../edit-card/edit-card.component';
// import { Http } from '@angular/http';

declare var $:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [CardService, EditCardComponent]
})
export class UserProfileComponent implements OnInit {
cards: any;
message: string;
user: string;
showEditForm: boolean = false;
cardVisibility: boolean = true;
qrcodeIcon: boolean = true;
icon: any;
editedCard: any = {
  fullName: '',
  companyName: '',
  position: '',
  phoneNum: '',
  linkedIn: '',
  email: ''
};

  constructor(
    private cardService: CardService,
    private editCardComp: EditCardComponent
  ) { }

  ngOnInit() {
    $('#pageContent').addClass('hidden');
    $('#editForm').width($('#oneCard').width());
    this.cardService.getCards().subscribe(result =>
              {
                this.message = result.message;
                this.cards   = result.userInfo.cards;
                this.user    = result.userInfo.fullName;
              }
    )

  }

  onOffSwitch(id) {
    if (this.cardVisibility) this.cardVisibility = false;
    else this.cardVisibility = true;
    // console.log("ID: " + id + " VIS: " + this.cardVisibility);
    this.cardService.changeVisibility(id, this.cardVisibility)
    .subscribe(result =>
              {
                this.message = result.message;
              }
    );
  }

  editCard(id) {
    // let currentCard;
    $(`#editForm${id}`).slideToggle("slow");
    // this.cards.forEach((oneCard, index) => {
    //   if (id === oneCard._id) {
    //     currentCard = this.cards[index];
    //   }
    // });
    // form.value.fullName = currentCard.fullName;

    // $('#oneCard').css('transform', 'rotateY(-180deg)');
}
 cancelEdit(id) {
     $(`#editForm${id}`).slideToggle("fast");
 }

saveChanges(id, form: NgForm) {
  $(`#editForm${id}`).slideToggle("fast");
  this.editedCard.fullName    = form.value.fullName;
  this.editedCard.companyName = form.value.companyName;
  this.editedCard.position    = form.value.position;
  this.editedCard.phoneNum    = form.value.phoneNum
  this.editedCard.linkedIn    = form.value.linkedIn;
  this.editedCard.email       = form.value.email;
  // send changes to server
  this.cardService.editCard(id, this.editedCard)
  .subscribe(res => {
  this.message = res.message;
});
//update cards array here
//this is desparate! there gotta be a better way! \
//i need to reassing the cards array
this.cards.forEach((oneCard, index) => {
  if (id === oneCard._id) {
    this.cards[index] = this.editedCard;
  }
});
// console.log(this.cards);
}

enlargeQr(id) {
  this.cards.forEach(oneCard => {
    if(id === oneCard._id.toString()) {
    $(`#QR2${id}`).html(oneCard.QRcode);
    }
      });
      if (this.qrcodeIcon) {
        this.qrcodeIcon = false;
        $(`#QR2${id}`).slideToggle("fast");
        $(`#QR${id}`).slideToggle("slow");
      }
      else {
        this.qrcodeIcon = true;
        $(`#QR2${id}`).slideToggle("slow");
        $(`#QR${id}`).slideToggle("fast");
      }
}


  deleteCard(id) {

    this.cardService.removeCardFromCollection(id)
    .subscribe(res => {
      this.message = res.message;
    });
    this.cardService.removeCardFromArray(id)
    .subscribe(res => {
      this.message += res.message;
      // this.cards    = res.cards;
    });
    //this is desparate! there gotta be a better way! \
  //i need to simply reassing the cards array to reflect the changes
    this.cards.forEach((oneCard, index) => {
      if(id.toString() === oneCard._id.toString()) {
        this.cards.splice(index, 1);
      }
    });
  }

}
