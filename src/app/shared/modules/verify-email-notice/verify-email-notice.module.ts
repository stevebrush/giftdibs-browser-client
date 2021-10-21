import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoticeModule } from '@giftdibs/ux';

import { VerifyEmailNoticeComponent } from './verify-email-notice.component';

@NgModule({
  imports: [CommonModule, NoticeModule, RouterModule],
  exports: [VerifyEmailNoticeComponent],
  declarations: [VerifyEmailNoticeComponent],
})
export class VerifyEmailNoticeModule {}
