import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationComponent,
         LoginComponent,
         RegisterComponent,
         ForgottenComponent } from './authentication-components';

import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    ForgottenComponent
  ]
})
export class AuthenticationModule { }
