import { Component, OnInit } from '@angular/core';
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
};

  constructor(
    private cardService: CardService,
    private editCardComp: EditCardComponent
  ) { }

  ngOnInit() {
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
    console.log("ID: " + id + " VIS: " + this.cardVisibility);
    this.cardService.changeVisibility(id, this.cardVisibility)
    .subscribe(result =>
              {
                this.message = result.message;
              }
    );
  }

  editCard(id) {
    $(`#editForm${id}`).slideToggle("slow");
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
  this.cardService.editCard(id, this.editedCard)
  .subscribe(res => {
  this.message = res.message;
});
//update cards array here
this.cards.forEach(oneCard => {
  if (this.editedCard._id === oneCard._id) {
    oneCard = this.editedCard;
    console.log(oneCard);
  }
});
}

enlargeQr(id) {
  this.cards.forEach(oneCard => {
    if(id === oneCard._id.toString()) {
    $(`#QR2${id}`).html(oneCard.QRcode);
    }
      });
      if (this.qrcodeIcon) {
        this.qrcodeIcon = false;
        $(`#QR${id}`).addClass("hidden");
        $(`#QR2${id}`).removeClass("hidden");
      }
      else {
        this.qrcodeIcon = true;
        $(`#QR2${id}`).addClass("hidden");
        $(`#QR${id}`).removeClass("hidden");
      }
}


  deleteCard(id) {
    //  console.log("CARD TO DELETE: " + id);
    // this.cardService.removeCardFromCollection(id)
    // .subscribe(res => {
    //   this.message = res.message;
    // });
    this.cardService.removeCardFromArray(id)
    .subscribe(res => {
      this.message += res.message;
      // this.cards    = res.cards;
    });
    //this is desparate! there gotta be a better way! \
  //i need to wait for subscribe and then simply reassing the cards array
    this.cards.forEach((oneCard, index) => {
      if(id.toString() === oneCard._id.toString()) {
        this.cards.splice(index, 1);
      }
    });
  }

}
