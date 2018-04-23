import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { User } from '../../features/users/user';

@Component({
  selector: 'gd-user-thumbnail',
  templateUrl: './user-thumbnail.component.html',
  styleUrls: ['./user-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserThumbnailComponent {
  @Input()
  public user: User;

  @Input()
  public size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
}
