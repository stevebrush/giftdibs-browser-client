import {
  NgModule
} from '@angular/core';
import { WelcomeComponent } from '@app/modules/home/welcome/welcome.component';
import { RouterModule } from '@angular/router';

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
