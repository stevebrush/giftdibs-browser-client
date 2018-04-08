import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldModule } from '../../modules/form-field/form-field.module';
import { PasswordViewerModule } from '../../modules/password-viewer/password-viewer.module';
import { AuthInterceptor } from '../../modules/session/authorization.interceptor';
import { NoticeModule } from '../../modules/notice/notice.module';

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
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormFieldModule,
    PasswordViewerModule,
    AccountRoutingModule,
    NoticeModule
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AccountModule { }
