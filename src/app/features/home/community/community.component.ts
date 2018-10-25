import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  Gift,
  GiftService
} from '@app/shared/modules/gift';

@Component({
  selector: 'gd-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityComponent implements OnInit {
  public gifts: Gift[];
  public isLoading = true;
  public hasMore = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private giftService: GiftService
  ) { }

  public ngOnInit(): void {
    this.giftService.getAll()
      .subscribe((gifts: Gift[]) => {
        this.gifts = gifts;
        this.isLoading = false;

        if (gifts && gifts.length) {
          this.hasMore = true;
        }

        this.changeDetector.markForCheck();
      });
  }

  public loadMoreResults(): void {
    const startIndex = this.gifts.length - 1;
    this.isLoading = true;

    this.giftService.getAll(startIndex)
      .subscribe(
        (gifts: Gift[]) => {
          if (gifts && gifts.length) {
            this.gifts = this.gifts.concat(gifts);
            this.hasMore = true;
          } else {
            this.hasMore = false;
          }

          this.isLoading = false;
          this.changeDetector.markForCheck();
        }
      );
  }
}
