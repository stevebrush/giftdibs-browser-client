import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    const session = JSON.parse(localStorage.getItem('currentUser'));
    this.userService
      .getById(session.user._id)
      .subscribe((user: any) => {
        this.user = user;
      });
  }
}
