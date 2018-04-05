import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldModule } from '../form-field/form-field.module';
import { PasswordViewerModule } from '../password-viewer/password-viewer.module';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegisterComponent } from './register.component';
import { RegistrationService } from './registration.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    FormFieldModule,
    PasswordViewerModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [
    RegistrationService
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegistrationModule { }
