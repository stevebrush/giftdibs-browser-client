import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'gd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];

  constructor(
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.userService.getAll()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }
}
