import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'gd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  public users: User[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.userService.getAll()
      .subscribe((users: User[]) => {
        this.users = users;
        this.changeDetector.markForCheck();
      });
  }
}
