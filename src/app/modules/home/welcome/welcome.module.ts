import {
  NgModule
} from '@angular/core';
import { WelcomeComponent } from '@app/modules/home/welcome/welcome.component';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule {}
