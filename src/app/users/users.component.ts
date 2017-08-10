import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/first';

import { UserService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public users: User[];

  constructor(
    private userService: UserService) { }

  public ngOnInit(): void {
    this.userService
      .getAll()
      .first()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }
}
