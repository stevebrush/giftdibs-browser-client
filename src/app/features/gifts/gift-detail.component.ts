// #region imports
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
  AlertService,
  ConfirmAnswer,
  ConfirmService,
  ModalInstance
} from '../../modules';

import {
  SessionService
} from '../account/session';

import {
  Gift
} from './gift';

import {
  GiftService
} from './gift.service';

import {
  GiftDetailContext
} from './gift-detail-context';
// #endregion

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
    this.gift = this.context.gift;
    this.isSessionUser = this.sessionService.isSessionUser(this.gift.user.id);
  }

  public onDibChange(): void {
    this.giftService.getById(this.gift.id)
      .subscribe((gift: Gift) => {
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
        this.giftService.update(this.gift.id, this.gift)
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
