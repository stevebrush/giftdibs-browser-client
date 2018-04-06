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

import { FormFieldModule } from '../form-field/form-field.module';
import { PasswordViewerModule } from '../password-viewer/password-viewer.module';
import { AuthInterceptor } from '../session/authorization.interceptor';

import { AccountRoutingModule } from './account-routing.module';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AccountService } from './account.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify/verify.component';
import { NoticeModule } from '../notice/notice.module';

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
    VerifyAccountComponent
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
