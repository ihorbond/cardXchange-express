import { Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



export const routes: Routes = [
    { path: 'contacts', component: ContactsComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'about', component: AboutComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
