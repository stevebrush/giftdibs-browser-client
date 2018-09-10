// #region imports
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
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
export class GiftPreviewComponent implements OnInit, OnDestroy {
  @Input()
  public gift: Gift;

  public isSessionUser = false;

  // private ngUnsubscribe = new Subject();

  constructor() { }

  public ngOnInit(): void {
    console.log('gift?', this.gift);
  }

  public ngOnDestroy(): void {
    // this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
  }

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
