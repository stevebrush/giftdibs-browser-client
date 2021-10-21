import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule, ThumbnailModule } from '@giftdibs/ux';

import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [GridModule, RouterModule, ThumbnailModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
