import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  finalize
} from 'rxjs/operators';

import {
  NotificationService
} from './notification.service';

import {
  Notification
} from './notification';
import { AlertService } from '../../modules';

@Component({
  selector: 'gd-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit {
  public isLoading = false;
  public notifications: Notification[];

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.notificationService.getAll()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        (notifications: Notification[]) => {
          this.notifications = notifications;
          this.changeDetector.markForCheck();
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  public removeNotification(notification: Notification): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.notificationService.remove(notification.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        () => {
          this.notifications.splice(this.notifications.indexOf(notification), 1);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }
}
