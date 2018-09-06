import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Gift } from '@app/shared/modules/gift';

import { AffixService } from '@app/ui/affix';

@Component({
  selector: 'gd-dib-ribbon',
  templateUrl: './dib-ribbon.component.html',
  styleUrls: ['./dib-ribbon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AffixService
  ]
})
export class DibRibbonComponent implements OnInit {
  @Input()
  public gift: Gift;

  public isVisible = false;

  constructor() { }

  public ngOnInit(): void {
    if (this.gift.dibs && this.gift.dibs.length) {
      let numDibbed = 0;
      this.gift.dibs.forEach((dib) => {
        numDibbed += dib.quantity;
      });

      this.isVisible = (numDibbed === this.gift.quantity);
    }
  }
}
