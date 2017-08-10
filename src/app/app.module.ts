import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { UsersComponent } from './users';
import { UserComponent } from './user';
import { ProfileComponent } from './profile';
import { SettingsComponent } from './settings';
import { ForgottenComponent } from './forgotten';
import { ResetPasswordComponent } from './reset-password';
import { DeleteAccountComponent } from './delete-account';
import { PageNotFoundComponent } from './404';
import { VerifyEmailComponent } from './verify-email';
import { WishListsComponent } from './wish-lists';
import { WishListComponent } from './wish-list';

import { AboutComponent, SupportComponent, PrivacyPolicyComponent, TermsComponent } from './support';

import { routing } from './app.routing';

import { AuthGuard } from './_guards';
import {
  AlertService,
  AuthenticationService,
  UserService,
  SessionService,
  WindowService,
  WishListService
} from './_services';

import {
  FormGroupComponent,
  FacebookLoginButtonComponent,
  AlertComponent,
  EmailVerificationAlertComponent,
  ButtonComponent,
  WishListCreateComponent,
  WishListEditComponent,
  ModalComponent,
  FooterComponent
} from './_components';

@NgModule({
  declarations: [
    AppComponent,
    FacebookLoginButtonComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserComponent,
    ProfileComponent,
    SettingsComponent,
    FormGroupComponent,
    ForgottenComponent,
    ResetPasswordComponent,
    DeleteAccountComponent,
    PageNotFoundComponent,
    EmailVerificationAlertComponent,
    ButtonComponent,
    VerifyEmailComponent,
    AboutComponent,
    SupportComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    WishListCreateComponent,
    WishListEditComponent,
    WishListComponent,
    WishListsComponent,
    ModalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
  ],
  providers: [
    AlertService,
    AuthGuard,
    AuthenticationService,
    UserService,
    SessionService,
    WindowService,
    WishListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
