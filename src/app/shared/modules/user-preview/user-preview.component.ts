import { Component, Input } from '@angular/core';

import { User } from '../user/user';

@Component({
  selector: 'gd-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss'],
})
export class UserPreviewComponent {
  @Input()
  public showFollowButton = false;

  @Input()
  public user: User;
}
