import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  GDAlertService
} from './alert.service';

@Component({
  selector: 'gd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class GDAlertComponent implements OnInit, OnDestroy {
  public message: string;

  private alertSubscription: Subscription;

  constructor(
    private alertService: GDAlertService
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
