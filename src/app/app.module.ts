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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SessionModule,
    AlertModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
