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

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    PasswordViewerModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class LoginModule { }
