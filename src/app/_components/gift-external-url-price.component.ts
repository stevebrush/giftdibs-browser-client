import { Component, Input, OnInit } from '@angular/core';

import { WishListService } from '../_services';

@Component({
  selector: 'app-gift-external-url-price',
  templateUrl: './gift-external-url-price.component.html'
})
export class GiftExternalUrlPriceComponent implements OnInit {
  @Input()
  public wishListId: string;

  @Input()
  public giftId: string;

  @Input()
  public externalUrl: any;

  @Input()
  public dateScrapedRecommended: number;
  public isLoading = true;

  constructor(
    private wishListService: WishListService) { }

  public ngOnInit(): void {
    this.isLoading = true;
    let isUrlCurrent = false;

    if (this.externalUrl.dateScraped) {
      const dateScraped = new Date(this.externalUrl.dateScraped).getTime();
      const isValidDate = isFinite(dateScraped);
      if (isValidDate) {
        isUrlCurrent = (dateScraped > this.dateScrapedRecommended);
      }
    }

    if (isUrlCurrent) {
      this.isLoading = false;
    } else {
      this.wishListService
        .scrapeUrlContents(this.wishListId, this.giftId, this.externalUrl._id)
        .first()
        .finally(() => this.isLoading = false)
        .subscribe((data: any) => {
          this.externalUrl = data.externalUrl;
        });
    }
  }
}
