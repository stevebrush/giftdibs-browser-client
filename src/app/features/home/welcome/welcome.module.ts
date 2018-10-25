import {
  NgModule
} from '@angular/core';

import {
  RouterModule
} from '@angular/router';

import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    WelcomeComponent
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule {}
