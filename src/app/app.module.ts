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
import { SettingsComponent } from './settings';
import { ForgottenComponent } from './forgotten';
import { ResetPasswordComponent } from './reset-password';
import { DeleteAccountComponent } from './delete-account';
import { PageNotFoundComponent } from './404';
import { VerifyEmailComponent } from './verify-email';
import { WishListsComponent } from './wish-lists';
import { WishListComponent } from './wish-list';

import {
  AboutComponent,
  SupportComponent,
  PrivacyPolicyComponent,
  TermsComponent
} from './support';

import { routing } from './app.routing';

import { AuthGuard } from './_guards';
import {
  AlertService,
  AuthenticationService,
  UserService,
  SessionService,
  WindowService,
  WishListService,
  ScraperService
} from './_services';

import {
  FormGroupComponent,
  FacebookLoginButtonComponent,
  AlertComponent,
  EmailVerificationAlertComponent,
  ButtonComponent,
  ButtonContainerComponent,
  WishListCreateComponent,
  WishListEditComponent,
  ModalComponent,
  FooterComponent,
  GiftCreateComponent,
  GiftEditComponent,
  GiftExternalUrlPriceComponent,
  CardComponent,
  CardTitleComponent,
  CardBodyComponent
} from './_components';

import { GridModule } from './_modules';

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
    SettingsComponent,
    FormGroupComponent,
    ForgottenComponent,
    ResetPasswordComponent,
    DeleteAccountComponent,
    PageNotFoundComponent,
    EmailVerificationAlertComponent,
    ButtonComponent,
    ButtonContainerComponent,
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
    FooterComponent,
    GiftCreateComponent,
    GiftEditComponent,
    GiftExternalUrlPriceComponent,
    CardComponent,
    CardTitleComponent,
    CardBodyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    GridModule
  ],
  providers: [
    AlertService,
    AuthGuard,
    AuthenticationService,
    UserService,
    SessionService,
    WindowService,
    WishListService,
    ScraperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
