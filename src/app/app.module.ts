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

import { routing } from './app.routing';

import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService, SessionService } from './_services';
import { AppFormGroupComponent, AlertComponent, EmailVerificationAlertComponent, ButtonComponent } from './_components';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UserComponent,
    ProfileComponent,
    SettingsComponent,
    AppFormGroupComponent,
    ForgottenComponent,
    ResetPasswordComponent,
    DeleteAccountComponent,
    PageNotFoundComponent,
    EmailVerificationAlertComponent,
    ButtonComponent,
    VerifyEmailComponent
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
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
