import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  FormFieldModule,
  GdImageUploaderModule,
  GridModule,
  HideUntilModule,
  IconModule,
  NoticeModule,
  PasswordViewerModule,
  WaitModule
} from '@app/ui';

import {
  AssetsModule
} from '@app/shared/modules/assets';

import {
  UserModule
} from '@app/shared/modules/user';

import {
  FacebookModule
} from './facebook';

import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './account.service';
import { DeleteComponent } from './delete/delete.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingsComponent } from './settings/settings.component';
import { VerifyAccountComponent } from './verify/verify.component';

@NgModule({
  imports: [
    AccountRoutingModule,
    AssetsModule,
    CommonModule,
    FacebookModule,
    FormFieldModule,
    GdImageUploaderModule,
    GridModule,
    HideUntilModule,
    IconModule,
    NoticeModule,
    PasswordViewerModule,
    ReactiveFormsModule,
    UserModule,
    WaitModule
  ],
  declarations: [
    ForgottenComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    SettingsComponent,
    DeleteComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
