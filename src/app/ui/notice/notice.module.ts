import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { NoticeHeadingComponent } from './notice-heading.component';
import { NoticeComponent } from './notice.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NoticeComponent,
    NoticeHeadingComponent
  ],
  declarations: [
    NoticeComponent,
    NoticeHeadingComponent
  ]
})
export class NoticeModule { }
