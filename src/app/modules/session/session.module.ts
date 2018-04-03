import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { SessionService } from './session.service';
import { IsLoggedInGuard } from './is-logged-in.guard';
import { IsLoggedOutGuard } from './is-logged-out.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    IsLoggedInGuard,
    IsLoggedOutGuard,
    SessionService
  ]
})
export class SessionModule { }
