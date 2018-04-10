import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import { NoticeModule } from '../notice/notice.module';

import { VerifyEmailNoticeComponent } from './verify-email-notice.component';

@NgModule({
  imports: [
    CommonModule,
    NoticeModule,
    RouterModule
  ],
  exports: [
    VerifyEmailNoticeComponent
  ],
  declarations: [
    VerifyEmailNoticeComponent
  ]
})
export class VerifyEmailNoticeModule { }
