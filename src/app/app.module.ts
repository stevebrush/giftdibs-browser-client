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

import { routing } from './app.routing';

import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService, SessionService } from './_services';
import { AppFormGroupComponent, AlertComponent } from './_components';

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
    AppFormGroupComponent
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
