import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  DibService
} from '@app/shared/modules/dib';

import {
  finalize
} from 'rxjs/operators';

@Component({
  selector: 'gd-dibs',
  templateUrl: './dibs.component.html',
  styleUrls: ['./dibs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DibsComponent implements OnInit {
  public recipients: any;
  public isLoading = true;

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

  public showActive(): void {
    this.fetchRecipients(false);
  }

  public showDelivered(): void {
    this.fetchRecipients(true);
  }

  private fetchRecipients(isDelivered = false): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.dibService.getAllRecipients(isDelivered)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe((data: any) => {
        this.recipients = data.recipients;
        this.changeDetector.markForCheck();
      });
  }
}
