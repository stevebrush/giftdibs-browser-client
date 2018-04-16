import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { User } from '../user';
import { UserService } from '../user.service';
import { AlertService } from '../../../modules/alert/alert.service';

@Component({
  selector: 'gd-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
  public user: User;

  private ngUnsubscribe = new Subject();

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userService.getById(params.userId)
        .subscribe(
          (user: User) => {
            this.user = user;
            this.changeDetector.markForCheck();
          },
          (err: any) => {
            if (err.status === 404) {
              this.alertService.error('User not found.', true);
              this.router.navigate(['/users']);
            }
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
