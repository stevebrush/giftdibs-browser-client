import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegistrationService } from './registration.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RegistrationRoutingModule
  ],
  declarations: [RegisterComponent],
  providers: [
    RegistrationService
  ]
})
export class RegistrationModule { }
