import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule
} from '@angular/forms';

import { FormFieldModule } from '../../modules/form-field/form-field.module';
import { GridModule } from '../../modules/grid/grid.module';
import { HideUntilModule } from '../../modules/hide-until/hide-until.module';
import { PasswordViewerModule } from '../../modules/password-viewer/password-viewer.module';
import { NoticeModule } from '../../modules/notice/notice.module';

import {
  GD_AUTHORIZATION_PROVIDERS
} from '../../modules/session';

import { AccountRoutingModule } from './account-routing.module';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountService } from './account.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify/verify.component';
import { SettingsComponent } from './settings/settings.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  imports: [
    AccountRoutingModule,
    CommonModule,
    FormFieldModule,
    GridModule,
    HideUntilModule,
    NoticeModule,
    PasswordViewerModule,
    ReactiveFormsModule
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
    AccountService,
    GD_AUTHORIZATION_PROVIDERS
  ]
})
export class AccountModule { }
