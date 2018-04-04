import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AlertService } from './alert.service';

@Component({
  selector: 'gd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {
  public message: string;

  private alertSubscription: Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  public ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage()
      .subscribe((message: any) => {
        this.message = message;
      });
  }

  public ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }
}
