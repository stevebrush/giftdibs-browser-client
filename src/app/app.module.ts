import {
  APP_INITIALIZER,
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import { SessionModule } from './modules/session/session.module';
import { AlertModule } from './modules/alert/alert.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { VerifyEmailNoticeModule } from './modules/verify-email-notice/verify-email-notice.module';
import { OverlayModule } from './modules/overlay/overlay.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStartupService } from './app-startup.service';

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
    SessionModule,
    AlertModule,
    NavbarModule,
    OverlayModule,
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
  ]
})
export class AppModule { }
