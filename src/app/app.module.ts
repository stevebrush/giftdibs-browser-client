import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SessionModule } from '@giftdibs/session';
import { AlertModule } from '@giftdibs/ux';

import { NavbarModule } from 'src/app/shared/modules/navbar';
import { VerifyEmailNoticeModule } from 'src/app/shared/modules/verify-email-notice';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GiftDetailModule } from './shared/modules/gift-detail';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AlertModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    GiftDetailModule,
    NavbarModule,
    SessionModule.forRoot(environment.apiUrl),
    VerifyEmailNoticeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
