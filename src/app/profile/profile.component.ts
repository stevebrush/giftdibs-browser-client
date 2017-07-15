import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { UserService, SessionService } from '../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public user: any;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    const user = this.sessionService.user;
    this.userService
      .getById(user._id)
      .subscribe((data: any) => {
        this.user = data;
      });
  }
}
