import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CardService } from './card.service';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
