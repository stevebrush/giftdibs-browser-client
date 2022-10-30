import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  FormFieldModule,
  ModalModule,
  NoticeModule,
  PasswordViewerModule,
  WaitModule,
} from '@giftdibs/ux';

import { FacebookModule } from '../facebook';

import { LoginHelpComponent } from './login-help.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent, LoginHelpComponent],
  imports: [
    CommonModule,
    FacebookModule,
    FormFieldModule,
    FormsModule,
    LoginRoutingModule,
    NoticeModule,
    PasswordViewerModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule,
    WaitModule,
  ],
})
export class LoginModule {}
