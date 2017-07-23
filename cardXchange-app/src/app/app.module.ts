import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CardService } from './card.service';
import { AddCardComponent } from './add-card/add-card.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//qr code generator
import { QRCodeModule } from 'angular2-qrcode'
//qr code scanner
import { QrScannerModule } from 'angular2-qrscanner';
import { AboutComponent } from './about/about.component'
import { AuthorizationService } from './authorization.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditCardComponent } from './edit-card/edit-card.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    ContactsComponent,
    AddCardComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    EditCardComponent
  ],
  imports: [
    QrScannerModule,
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
