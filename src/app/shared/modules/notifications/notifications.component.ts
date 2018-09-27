import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  finalize
} from 'rxjs/operators';

import { DibService } from '@app/shared/modules/dib';
import { GiftService } from '@app/shared/modules/gift';

import {
  AlertService
} from '@app/ui';

import { Notification } from './notification';
import { NotificationService } from './notification.service';

@Component({
  selector: 'gd-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DibService,
    GiftService
  ]
})
export class NotificationsComponent implements OnInit {
  public isLoading = true;
  public notifications: Notification[];

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private dibService: DibService,
    private giftService: GiftService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.fetchNotifications();
  }

  public isGiftReceived(giftId: string): boolean {
    console.log('is gift received?', giftId);
    return false;
  }

  public markDibDelivered(dibId: string): void {
    console.log('mark dib delivered', dibId);
    this.dibService.markAsDelivered(dibId)
      .subscribe(
        (result: any) => {
          console.log('Success?', result);
        },
        (err) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  public markGiftReceived(giftId: string): void {
    console.log('mark gift received:', giftId);
    this.giftService.markAsReceived(giftId)
      .subscribe(
        (result: any) => {
          console.log('Success?', result);
        },
        (err) => {
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
