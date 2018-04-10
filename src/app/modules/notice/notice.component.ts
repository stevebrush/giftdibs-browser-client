import { Component, Input } from '@angular/core';

import { NoticeType } from './notice-type';

@Component({
  selector: 'gd-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {
  @Input()
  public noticeType: NoticeType = 'info';
}
