import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../features/users/user';

@Component({
  selector: 'gd-user-thumbnail',
  templateUrl: './user-thumbnail.component.html',
  styleUrls: ['./user-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserThumbnailComponent implements OnInit {
  @Input()
  public user: User;

  @Input()
  public size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  public get initials(): string {
    return this.user.firstName.charAt(0) + this.user.lastName.charAt(0);
  }

  constructor() { }

  public ngOnInit() {
  }
}
