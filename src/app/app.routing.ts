import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { UsersComponent } from './users';
import { UserComponent } from './user';
import { SettingsComponent } from './settings';
import { ForgottenComponent } from './forgotten';
import { ResetPasswordComponent } from './reset-password';
import { DeleteAccountComponent } from './delete-account';
import { PageNotFoundComponent } from './404';
import { VerifyEmailComponent } from './verify-email';
import { WishListsComponent } from './wish-lists';
import { WishListComponent } from './wish-list';
import { DibsComponent } from './dibs';

import {
  SupportComponent,
  AboutComponent,
  PrivacyPolicyComponent,
  TermsComponent
} from './support';

import { AuthGuard } from './_guards';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotten', component: ForgottenComponent },
  { path: 'reset-password/:resetPasswordToken', component: ResetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },

  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'delete-account', component: DeleteAccountComponent, canActivate: [AuthGuard] },
  { path: 'verify-email/:emailAddressVerificationToken',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard]
  },

  { path: 'users/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

  { path: 'wish-lists/:wishListId', component: WishListComponent, canActivate: [AuthGuard] },
  { path: 'wish-lists', component: WishListsComponent, canActivate: [AuthGuard] },

  { path: 'dibs', component: DibsComponent, canActivate: [AuthGuard] },

  { path: 'support',
    component: SupportComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'privacy', component: PrivacyPolicyComponent },
      { path: 'terms', component: TermsComponent }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '404' }
];

export const routing = RouterModule.forRoot(appRoutes);
