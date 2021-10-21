import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GiftModule } from '@app/shared/modules/gift';
import { GiftPreviewModule } from '@app/shared/modules/gift-preview';
import { GridModule, NoticeModule, WaitModule } from '@giftdibs/ux';

import { CommunityComponent } from './community.component';

@NgModule({
  imports: [
    CommonModule,
    GiftPreviewModule,
    GiftModule,
    GridModule,
    NoticeModule,
    RouterModule,
    WaitModule,
  ],
  declarations: [CommunityComponent],
  exports: [CommunityComponent],
})
export class CommunityModule {}
