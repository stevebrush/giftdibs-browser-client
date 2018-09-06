import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  DibService
} from '@app/shared/modules/dib';

@Component({
  selector: 'gd-dibs',
  templateUrl: './dibs.component.html',
  styleUrls: ['./dibs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DibsComponent implements OnInit {
  public recipients: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dibService: DibService
  ) { }

  public ngOnInit(): void {
    this.fetchRecipients();
  }

  public onDibChange(): void {
    this.fetchRecipients();
  }

  private fetchRecipients(): void {
    this.dibService.getAllRecipients()
      .subscribe((data: any) => {
        this.recipients = data.recipients;
        this.changeDetector.markForCheck();
      });
  }
}
