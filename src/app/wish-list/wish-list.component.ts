import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/first';

import { DragulaService } from 'ng2-dragula';

import {
  AlertService,
  WishListService,
  SessionService
} from '../_services';

import {
  Gift,
  WishList
} from '../_models';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html'
})
export class WishListComponent implements OnInit {
  public wishList: WishList;
  public isLoading = false;
  public isCurrentUser = false;
  public activeGift: Gift;
  public dateScrapedRecommended: number;

  private wishListId: string;

  constructor(
    private alertService: AlertService,
    private wishListService: WishListService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private dragulaService: DragulaService) {
      this.dragulaService.drag.subscribe((value: any) => {
        console.log(`drag: ${value[0]}`);
      });

      this.dragulaService.drop.subscribe((value: any) => {
        console.log(`drop: ${value[0]}`);
        console.log('wishList?', this.wishList.gifts);
        this.updateWishList();
      });

      this.dragulaService.over.subscribe((value: any) => {
        console.log(`over: ${value[0]}`);
      });

      this.dragulaService.out.subscribe((value: any) => {
        console.log(`out: ${value[0]}`);
      });
    }

  public ngOnInit(): void {
    this.isLoading = true;
    this.route.params
      .first()
      .subscribe((params: any) => {
        this.wishListId = params.wishListId;
        this.getWishList();
    });
  }

  public deleteWishList(wishListId: string): void {
    this.isLoading = true;
    this.wishListService
      .remove(wishListId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.alertService.success(data.message, true);
          this.router.navigate(['/profile']);
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }

  public deleteGift(giftId: string): void {
    this.isLoading = true;
    this.wishListService
      .removeGift(this.wishListId, giftId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.getWishList();
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }

  public toggleReceived(gift: Gift): void {
    this.isLoading = true;
    gift.isReceived = !gift.isReceived;
    this.wishListService
      .updateGift(this.wishListId, gift)
      .first()
      .subscribe(
        (data: any) => {
          this.getWishList();
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }

  public onGiftCreateSuccess() {
    this.getWishList();
  }

  public onGiftEditSuccess(): void {
    this.getWishList();
    this.activeGift = undefined;
  }

  private getWishList(): void {
    this.isLoading = true;
    this.wishListService
      .getById(this.wishListId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.wishList = data.wishList;
          this.dateScrapedRecommended = data.externalUrls.dateScrapedRecommended;
          this.isCurrentUser = this.sessionService.isCurrentUser(this.wishList._user._id);
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }

  private updateWishList(): void {
    this.isLoading = true;
    this.wishListService
      .update(this.wishList)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          // this.getWishList();
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }
}
