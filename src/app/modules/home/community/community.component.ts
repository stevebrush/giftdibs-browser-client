import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { Gift, GiftService } from '@app/shared/modules/gift';

@Component({
  selector: 'gd-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityComponent implements OnInit {
  public gifts: Gift[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private giftService: GiftService
  ) { }

  public ngOnInit(): void {
    this.giftService.getAll()
      .subscribe((gifts: Gift[]) => {
        this.gifts = gifts;
        this.changeDetector.markForCheck();
      });
  }
}
