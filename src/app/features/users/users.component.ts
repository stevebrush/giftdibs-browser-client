import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { User, UserService } from 'src/app/shared/modules/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  protected users: User[] = [];

  #changeDetector: ChangeDetectorRef;
  #ngUnsubscribe = new Subject<void>();
  #userSvc: UserService;

  constructor(changeDetector: ChangeDetectorRef, userSvc: UserService) {
    this.#changeDetector = changeDetector;
    this.#userSvc = userSvc;
  }

  public ngOnInit(): void {
    this.#userSvc
      .getAll()
      .pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe((users) => {
        this.users = users;
        this.#changeDetector.markForCheck();
      });
  }
}
