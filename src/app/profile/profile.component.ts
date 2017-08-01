import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/first';

import { UserService, SessionService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(
    private userService: UserService,
    private sessionService: SessionService) { }

  public ngOnInit(): void {
    const sessionUser = this.sessionService.user;
    this.userService
      .getById(sessionUser._id)
      .first()
      .subscribe((user: User) => {
        this.user = user;
      });
  }
}
