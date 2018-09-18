// #region imports
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  Gift
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

  public isSessionUser = false;

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
}
