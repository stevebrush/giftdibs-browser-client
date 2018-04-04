import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { Alert } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'gd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {
  public alert: Alert;

  private ngUnsubscribe = new Subject();

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.alertService.alertStream
      .takeUntil(this.ngUnsubscribe)
      .subscribe((alert: Alert) => {
        this.alert = alert;
        this.changeDetector.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
