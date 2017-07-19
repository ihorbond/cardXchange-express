import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CardService {
BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) { }

//get all saved contacts
  getContacts() {
     return this.http.get(`${this.BASE_URL}/api/contacts`)
       .map((res) => res.json());
   }

   //add new own card
   addCard() {
     return this.http.delete(`${this.BASE_URL}/api/profile/my-cards/add`)
       .map((res) => res.json());
   }

   //save other user's card
   saveCard(id) {
     return this.http.delete(`${this.BASE_URL}/api/contacts/add/${id}`)
       .map((res) => res.json());
   }

   //remove card from contacts
      removeContact(id) {
        return this.http.delete(`${this.BASE_URL}/api/contacts/delete/${id}`)
          .map((res) => res.json());
      }

  //remove  own card
  removeCard(id) {
    return this.http.delete(`${this.BASE_URL}/api/profile/my-cards/delete/${id}`)
      .map((res) => res.json());
  }


  //update own card
  //  editCard(id) {
  //      return this.http.put(`${this.BASE_URL}/api/profile/my-cards/edit/${id}`, updatedCard)
  //        .map((res) => res.json());
  //    }



}
