import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { GD_AUTHORIZATION_PROVIDERS } from '../authorization/authorization-providers';

import { GD_API_URL } from './api-url-token';
import { SessionStartupModule } from './session-startup.module';
import { SessionService } from './session.service';

@NgModule({
  imports: [CommonModule, SessionStartupModule],
  providers: [GD_AUTHORIZATION_PROVIDERS, SessionService],
})
export class SessionModule {
  public static forRoot(apiUrl: string): ModuleWithProviders<SessionModule> {
    return {
      ngModule: SessionModule,
      providers: [
        {
          provide: GD_API_URL,
          useValue: apiUrl,
        },
      ],
    };
  }
}
