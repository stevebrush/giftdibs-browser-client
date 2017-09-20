import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
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
export class WishListComponent implements OnInit, OnDestroy {
  public wishList: WishList;
  public isLoading = false;
  public isCurrentUser = false;
  public activeGift: Gift;

  private wishListId: string;
  private dragulaSubscription: Subscription;

  constructor(
    private alertService: AlertService,
    private wishListService: WishListService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private dragulaService: DragulaService) {
      // Only drag with specific element:
      dragulaService.setOptions('bag-one', {
        moves: (el: any, container: any, handle: any) => {
          return (handle.className === 'drag-handle');
        }
      });

      this.dragulaSubscription = this.dragulaService.dropModel.subscribe((value: any) => {
        this.wishList.gifts.forEach((gift: Gift, i: number) => {
          gift.order = i;
        });

        this.updateWishList();
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

  public ngOnDestroy(): void {
    this.dragulaSubscription.unsubscribe();
    this.dragulaService.destroy('bag-one');
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
        (data: any) => {},
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }
}
