import { Component, OnInit } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public message: string;

  constructor(
    private alertService: AlertService) {}

  public ngOnInit() {
    this.alertService.getMessage()
      .subscribe(message => {
        this.message = message;
      });
  }
}
