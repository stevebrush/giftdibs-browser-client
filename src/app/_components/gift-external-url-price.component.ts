import { Component, Input, OnInit } from '@angular/core';

import {
  ScraperService,
  GiftService
} from '../_services';

import {
  Gift,
  ExternalUrl
} from '../_models';

@Component({
  selector: 'app-gift-external-url-price',
  templateUrl: './gift-external-url-price.component.html'
})
export class GiftExternalUrlPriceComponent implements OnInit {
  @Input()
  public wishListId: string;

  @Input()
  public gift: Gift;

  @Input()
  public externalUrl: ExternalUrl;
  public isLoading = true;

  constructor(
    private scraperService: ScraperService,
    private giftService: GiftService) { }

  public ngOnInit(): void {
    this.isLoading = true;
    let isUrlCurrent = false;

    if (this.externalUrl.dateScraped) {
      const dateScraped = new Date(this.externalUrl.dateScraped).getTime();
      const isValidDate = isFinite(dateScraped);
      if (isValidDate) {
        isUrlCurrent = (dateScraped > this.scraperService.dateScrapedRecommended);
      }
    }

    if (isUrlCurrent) {
      this.isLoading = false;
    } else {
      this.scraperService
        .getProductDetailsFromUrl(this.externalUrl.url)
        .first()
        .subscribe((scraperResponse: any) => {
          const productInfo = scraperResponse.products[0];
          this.externalUrl.price = productInfo.price;
          this.externalUrl.dateScraped = productInfo.dateScraped;

          this.updateGift();
        });
    }
  }

  private updateGift(): void {
    this.giftService
      .update(this.gift)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe((giftResponse: any) => {});
  }
}
