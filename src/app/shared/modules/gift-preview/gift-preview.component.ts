// #region imports
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';

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
export class GiftPreviewComponent {
  @Input()
  public gift: Gift;

  @Input()
  public showUserInfo = false;

  public isSessionUser = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private giftService: GiftService
  ) { }

  public showDibbedRibbon(gift: Gift): boolean {
    if (gift.dateReceived) {
      return false;
    }

    if (gift.dibs && gift.dibs.length) {
      let numDibbed = 0;
      gift.dibs.forEach((dib) => {
        numDibbed += dib.quantity;
      });

      return (numDibbed >= gift.quantity);
    }
  }

  public onDibChange(result: any): void {
    this.updateGift();
  }

  private updateGift(): void {
    this.giftService.getById(this.gift.id)
      .subscribe((gift: Gift) => {
        this.gift = gift;
        this.changeDetector.markForCheck();
      });
  }
}
