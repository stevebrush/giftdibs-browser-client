import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { SessionStartupService } from './session-startup.service';

export function startupServiceFactory(
  startupService: SessionStartupService,
): Function {
  // See: https://github.com/angular/angular/issues/14485
  const cb = function () {
    return startupService.load();
  };

  return cb;
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    SessionStartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [SessionStartupService],
      multi: true,
    },
  ],
})
export class SessionStartupModule {}
