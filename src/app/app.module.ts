import {
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SessionModule } from './modules/session/session.module';
import { AlertModule } from './modules/alert/alert.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { NoticeModule } from './modules/notice/notice.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SessionModule,
    AlertModule,
    NavbarModule,
    NoticeModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
