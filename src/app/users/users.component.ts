import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, UserService } from '../_services';
import { AlertService } from '../_modules/alert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public users: any[];

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) { }

  public ngOnInit(): void {
    this.userService
      .getAll()
      .subscribe((users: any[]) => {
        this.users = users;
      });
  }

  public delete(id: string): void {
    this.userService
      .remove(id)
      .subscribe(
        (data: any) => {
          this.authenticationService.logout();
          this.router.navigate(['/']);
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }
}
