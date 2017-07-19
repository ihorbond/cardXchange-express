import { Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
    { path: 'contacts', component: ContactsComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: '**', redirectTo: '' }
];
