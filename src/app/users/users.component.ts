import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/first';

import { AuthenticationService, UserService, AlertService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) { }

  public ngOnInit(): void {
    this.userService
      .getAll()
      .first()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  public delete(id: string): void {
    this.userService
      .remove(id)
      .first()
      .subscribe(
        () => {
          this.authenticationService.logout();
          this.router.navigate(['/']);
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }
}
