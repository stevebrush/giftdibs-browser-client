import {
  NgModule
} from '@angular/core';

import {
  CommunityComponent
} from './community.component';
import { GiftPreviewModule } from '@app/shared/modules/gift-preview';
import { GridModule } from '@app/ui';
import { CommonModule } from '@angular/common';
import { GiftModule } from '@app/shared/modules/gift';

@NgModule({
  imports: [
    CommonModule,
    GiftPreviewModule,
    GiftModule,
    GridModule
  ],
  declarations: [
    CommunityComponent
  ],
  exports: [
    CommunityComponent
  ]
})
export class CommunityModule {}
