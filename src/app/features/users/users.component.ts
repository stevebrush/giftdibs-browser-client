import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';

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
