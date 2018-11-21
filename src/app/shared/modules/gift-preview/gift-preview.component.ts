// #region imports
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  SessionService
} from '@giftdibs/session';

import {
  Gift,
  GiftService
} from '../gift';
// #endregion

@Component({
  selector: 'gd-gift-preview',
  templateUrl: './gift-preview.component.html',
  styleUrls: ['./gift-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftPreviewComponent implements OnInit {
  @Input()
  public gift: Gift;

  @Input()
  public showUserInfo = false;

  public defaultImageUrl = '/assets/gd-default-gift.png';
  public isSessionUser = false;
  public showDeliveredRibbon = false;
  public showDibbedRibbon = false;
  public showReceivedRibbon = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private giftService: GiftService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.isSessionUser = this.sessionService.isSessionUser(this.gift.user.id);
    this.showRibbon();
  }

  public onDibChange(): void {
    this.updateGift();
  }

  private showRibbon(): void {
    // Reset to default:
    this.showDeliveredRibbon = false;
    this.showDibbedRibbon = false;
    this.showReceivedRibbon = false;

    if (this.gift.dateReceived) {
      this.showReceivedRibbon = true;
    }

    const gift = this.gift;

    let numDelivered = 0;
    let allDelivered = false;

    let numDibbed = 0;
    let allDibbed = false;

    if (gift.dibs && gift.dibs.length) {
      gift.dibs.forEach((dib) => {
        numDibbed += dib.quantity;
        if (dib.dateDelivered) {
          numDelivered++;
        }
      });

      allDibbed = (numDibbed >= gift.quantity);
      allDelivered = (numDelivered === gift.dibs.length);
    }

    if (allDelivered) {
      this.showDeliveredRibbon = true;
    } else if (allDibbed) {
      this.showDibbedRibbon = true;
    }

    this.changeDetector.markForCheck();
  }

  private updateGift(): void {
    this.giftService.getById(this.gift.id)
      .subscribe((gift: Gift) => {
        this.gift = gift;
        this.showRibbon();
      });
  }
}
