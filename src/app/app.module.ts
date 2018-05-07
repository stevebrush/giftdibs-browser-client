import {
  APP_INITIALIZER,
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  NavbarModule
} from './modules/navbar';

import {
  SessionModule
} from './modules/session';

import {
  VerifyEmailNoticeModule
} from './modules/verify-email-notice';

import { AppRoutingModule } from './app-routing.module';
import { AppStartupService } from './app-startup.service';
import { AppComponent } from './app.component';

export function startupServiceFactory(startupService: AppStartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    SessionModule,
    VerifyEmailNoticeModule
  ],
  providers: [
    AppStartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [AppStartupService],
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: []
})
export class AppModule { }
