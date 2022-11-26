import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { WishList, WishListService } from 'src/app/shared/modules/wish-list';

@Component({
  selector: 'gd-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityComponent implements OnInit {
  public wishLists: WishList[];
  public isLoading = true;
  public hasMore = false;

  #wishListSvc: WishListService;

  constructor(
    private changeDetector: ChangeDetectorRef,
    wishlistSvc: WishListService
  ) {
    this.#wishListSvc = wishlistSvc;
  }

  public ngOnInit(): void {
    this.#wishListSvc.getAll().subscribe((wishLists) => {
      this.wishLists = wishLists;
      this.isLoading = false;

      if (wishLists?.length > 11) {
        this.hasMore = true;
      }

      this.changeDetector.markForCheck();
    });
  }

  public loadMoreResults(): void {
    const startIndex = this.wishLists.length;

    if (startIndex <= 0) {
      this.hasMore = false;
      return;
    }

    this.isLoading = true;

    this.#wishListSvc.getAll(startIndex).subscribe((wishLists) => {
      if (wishLists?.length) {
        this.wishLists = this.wishLists.concat(wishLists);
        this.hasMore = true;
      } else {
        this.hasMore = false;
      }

      this.isLoading = false;
      this.changeDetector.markForCheck();
    });
  }
}
