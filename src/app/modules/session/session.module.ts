import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { AlertModule } from '../alert/alert.module';

import { SessionService } from './session.service';

@NgModule({
  imports: [
    AlertModule,
    CommonModule
  ],
  providers: [
    SessionService
  ]
})
export class SessionModule { }
