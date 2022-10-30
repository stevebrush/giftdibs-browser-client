import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule, NoticeModule, WaitModule } from '@giftdibs/ux';

import { GiftModule } from 'src/app/shared/modules/gift';
import { GiftPreviewModule } from 'src/app/shared/modules/gift-preview';

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
