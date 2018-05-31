import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  zip
} from 'rxjs';

import {
  finalize
} from 'rxjs/operators';

import {
  AlertService
} from '../../modules/alert';

import {
  ConfirmAnswer,
  ConfirmService
} from '../../modules/confirm';

import {
  ModalInstance
} from '../../modules/modal';

import {
  SessionService
} from '../../modules/session';

import {
  Gift
} from './gift';

import {
  GiftService
} from './gift.service';

import {
  GiftDetailContext
} from './gift-detail-context';

@Component({
  selector: 'gd-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftDetailComponent implements OnInit {
  public gift: Gift;
  public isLoading = false;
  public isSessionUser: boolean;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private context: GiftDetailContext,
    private modal: ModalInstance<any>,
    private sessionService: SessionService,
    private giftService: GiftService
  ) { }

  public ngOnInit(): void {
    zip(
      this.giftService.getById(this.context.giftId)
    )
      .subscribe((value) => {
        this.gift = value[0];
        this.isSessionUser = this.sessionService.isSessionUser(this.gift.user._id);
        this.changeDetector.markForCheck();
      });
  }

  public onDibChange(): void {
    this.giftService.getById(this.gift._id).subscribe((gift: Gift) => {
      this.gift = gift;
      this.changeDetector.markForCheck();
    });
  }

  public markReceived(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.confirmService.confirm({
      message: 'Are you sure? This action cannot be undone.'
    }, (answer: ConfirmAnswer) => {
      if (answer.type === 'okay') {
        this.gift.isReceived = true;
        this.giftService.update(this.gift._id, this.gift)
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.changeDetector.markForCheck();
            })
          )
          .subscribe(
            (result: any) => {
              this.modal.close('save', {
                gift: this.gift
              });
            },
            (err: any) => {
              this.gift.isReceived = false;
              this.alertService.error(err.error.message);
            }
          );
      } else {
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  public close(): void {
    this.modal.close('cancel', {
      gift: this.gift
    });
  }
}
