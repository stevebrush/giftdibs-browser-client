import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { NoticeComponent } from './notice.component';
import { NoticeHeadingComponent } from './notice-heading.component';

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
