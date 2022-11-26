import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule, NoticeModule, WaitModule } from '@giftdibs/ux';

import { WishListPreviewModule } from 'src/app/shared/modules/wish-list-preview';

import { CommunityComponent } from './community.component';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    NoticeModule,
    RouterModule,
    WaitModule,
    WishListPreviewModule,
  ],
  declarations: [CommunityComponent],
  exports: [CommunityComponent],
})
export class CommunityModule {}
