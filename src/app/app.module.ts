import {
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  NavbarModule
} from '@app/shared/modules/navbar';

import {
  SessionModule
} from '@giftdibs/session';

import {
  AlertModule
} from '@giftdibs/ux';

import {
  VerifyEmailNoticeModule
} from '@app/ui';

import {
  environment
} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AlertModule,
    AppRoutingModule,
    BrowserModule,
    NavbarModule,
    SessionModule.forRoot(environment.apiUrl),
    VerifyEmailNoticeModule
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: []
})
export class AppModule { }
