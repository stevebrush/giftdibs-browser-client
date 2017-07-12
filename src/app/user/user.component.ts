import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  public user: any;
  private paramSubscription: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: any) => {
      this.userService
        .getById(params.id)
        .subscribe((user: any) => {
          this.user = user;
        });
    });
  }

  public ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
