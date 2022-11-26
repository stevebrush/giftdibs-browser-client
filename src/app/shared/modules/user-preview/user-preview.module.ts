import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaModule, ThumbnailModule } from '@giftdibs/ux';

import { FriendshipModule } from '../friendship';

import { UserPreviewComponent } from './user-preview.component';

@NgModule({
  declarations: [UserPreviewComponent],
  exports: [UserPreviewComponent],
  imports: [
    CommonModule,
    FriendshipModule,
    MediaModule,
    RouterModule,
    ThumbnailModule,
  ],
})
export class UserPreviewModule {}
