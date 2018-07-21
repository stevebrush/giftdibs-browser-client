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
  AlertService
} from '../../modules';

import { Notification } from './notification';
import { NotificationService } from './notification.service';

@Component({
  selector: 'gd-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit {
  public isLoading = true;
  public notifications: Notification[];

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.fetchNotifications();
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

  private fetchNotifications(): void {
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
}
