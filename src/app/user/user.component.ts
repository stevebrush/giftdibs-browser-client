import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { User } from '../_models';
import { UserService } from '../_services';
import { AlertService } from '../_modules/alert';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  public user: User;
  private paramSubscription: Subscription;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: any) => {
      this.userService
        .getById(params.id)
        .subscribe(
          (user: User) => {
            this.user = user;
          },
          (error: any) => {
            this.alertService.error('User not found.', true);
            this.router.navigate(['/']);
          });
    });
  }

  public ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
