import {
  ChangeDetectionStrategy,
  // ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  ModalInstance
} from '../../../../modules/modal';

import {
  Gift
} from '../gift';

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

  constructor(
    // private changeDetector: ChangeDetectorRef,
    private context: GiftDetailContext,
    private modal: ModalInstance<any>
  ) { }

  public ngOnInit(): void {
    this.gift = this.context.gift;
    // this.changeDetector.markForCheck();
  }

  public close(): void {
    this.modal.close();
  }
}
