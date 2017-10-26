import {
  Component,
  OnInit
} from '@angular/core';

import {
  AlertService,
  DibService
} from '../_services';

@Component({
  selector: 'app-dibs',
  templateUrl: './dibs.component.html'
})
export class DibsComponent implements OnInit {
  public recipients: any;

  constructor(
    private alertService: AlertService,
    private dibService: DibService) { }

  public ngOnInit(): void {
    this.refreshDibs();
  }

  public onDibEdit(): void {
    this.refreshDibs();
  }

  private refreshDibs(): void {
    this.dibService
      .getAllRecipients()
      .first()
      .subscribe(
        (data: any) => this.recipients = data.recipients,
        (err: any) => this.alertService.error(err.message)
      );
  }
}
