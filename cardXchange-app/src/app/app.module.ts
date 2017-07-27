import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';
import { routes }               from './app.routing';
import { AppComponent }         from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactsComponent }    from './contacts/contacts.component';
import { CardService }          from './card.service';
import { AddCardComponent }     from './add-card/add-card.component';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
//qr code generator
import { QRCodeModule }         from 'angular2-qrcode'
import { AboutComponent }       from './about/about.component'
import { AuthorizationService } from './authorization.service';
import { LoginComponent }       from './login/login.component';
import { SignupComponent }      from './signup/signup.component';
import { EditCardComponent }    from './edit-card/edit-card.component';
import { HelpComponent }        from './help/help.component';
import { HomeComponent }        from './home/home.component';
import { EventsComponent }      from './events/events.component';
import { FileSelectDirective }  from 'ng2-file-upload';
import { SearchPipe }           from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    ContactsComponent,
    AddCardComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    EditCardComponent,
    HelpComponent,
    HomeComponent,
    EventsComponent,
    SearchPipe,
    FileSelectDirective,
  ],
  imports: [
    FileSelectDirective,
    QRCodeModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CardService, AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
