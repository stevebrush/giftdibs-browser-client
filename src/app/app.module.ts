import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { DragulaModule } from 'ng2-dragula';

import {
  AuthenticationService,
  DibService,
  GiftService,
  ScraperService,
  SessionService,
  UserService,
  WindowService,
  WishListService,
  FriendshipService
} from './_services';

import {
  FacebookLoginButtonComponent,
  EmailVerificationAlertComponent,
  WishListCreateComponent,
  WishListEditComponent,
  ModalComponent,
  FooterComponent,
  GiftCreateComponent,
  GiftEditComponent,
  GiftExternalUrlPriceComponent,
  DibEditComponent,
  DibControlsComponent
} from './_components';

import {
  GDAlertModule,
  GDButtonModule,
  GDCardModule,
  GDFormFieldModule,
  GDGridModule,
  GDInputModule,
  GDNavbarModule
} from './_modules';

import { GDRoutingModule } from './routing.module';

import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AboutComponent,
    DeleteAccountComponent,
    DibsComponent,
    ForgottenComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SettingsComponent,
    SupportComponent,
    TermsComponent,
    UsersComponent,
    UserComponent,
    VerifyEmailComponent,
    WishListComponent,
    WishListsComponent,

    AppComponent,
    FacebookLoginButtonComponent,
    EmailVerificationAlertComponent,
    WishListCreateComponent,
    WishListEditComponent,
    ModalComponent,
    FooterComponent,
    GiftCreateComponent,
    GiftEditComponent,
    GiftExternalUrlPriceComponent,
    DibEditComponent,
    DibControlsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    DragulaModule,

    GDAlertModule,
    GDButtonModule,
    GDCardModule,
    GDFormFieldModule,
    GDGridModule,
    GDInputModule,
    GDNavbarModule,
    GDRoutingModule
  ],
  providers: [
    AuthenticationService,
    DibService,
    FriendshipService,
    GiftService,
    ScraperService,
    SessionService,
    UserService,
    WindowService,
    WishListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
