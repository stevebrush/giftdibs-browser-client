import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/merge';

import {
  DragulaService
} from 'ng2-dragula';

import {
  AlertService,
  DibService,
  GiftService,
  WishListService,
  SessionService
} from '../_services';

import {
  Dib,
  Gift,
  WishList
} from '../_models';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html'
})
export class WishListComponent implements OnInit, OnDestroy {
  public wishList: WishList;
  public gifts: Gift[];
  public activeGift: Gift;
  public isLoading = false;
  public isCurrentUser = false;
  public wishListId: string;

  public dibs: Dib[];
  private dragulaSubscription: Subscription;

  constructor(
    private alertService: AlertService,
    private dibService: DibService,
    private dragulaService: DragulaService,
    private giftService: GiftService,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private wishListService: WishListService
  ) {
    this.setupDragula();
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.route.params
      .first()
      .subscribe((params: any) => {
        this.wishListId = params.wishListId;
        this.fetchWishList();
      });
  }

  public ngOnDestroy(): void {
    this.dragulaSubscription.unsubscribe();
    this.dragulaService.destroy('bag-one');
  }

  public deleteGift(giftId: string): void {
    this.isLoading = true;
    this.giftService
      .remove(giftId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => this.fetchGifts(),
        (err: any) => this.alertService.error(err.error.message)
      );
  }

  public filterDibsByGiftId(giftId: string): Dib[] {
    return this.dibs.filter((dib: Dib) => {
      return (dib._gift === giftId);
    });
  }

  public toggleReceived(gift: Gift): void {
    this.isLoading = true;
    gift.isReceived = !gift.isReceived;
    this.giftService
      .update(gift)
      .first()
      .subscribe(
        (data: any) => { },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  public onDibChanges(data: any) {
    this.alertService.success(data.message);
    this.fetchDibs();
  }

  public onDibError(data: any): void {
    this.alertService.error(data.message);
  }

  public onGiftCreateSuccess() {
    this.fetchGifts();
  }

  public onGiftEditSuccess(data: { gift: Gift, message: string }): void {
    this.gifts.forEach((gift, i) => {
      if (gift._id === data.gift._id) {
        this.gifts[i] = data.gift;
      }
    });

    this.alertService.success(data.message);
    this.activeGift = undefined;
  }

  private fetchDibs(): void {
    this.isLoading = true;
    this.dibService
      .getAllByWishListId(this.wishListId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe((data: any) => {
        this.dibs = data.dibs;
      });
  }

  private fetchGifts(): void {
    this.isLoading = true;
    this.giftService
      .getAllByWishListId(this.wishListId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => this.gifts = data.gifts,
        (err: any) => this.alertService.error(err.error.message)
      );
  }

  private fetchWishList(): void {
    this.isLoading = true;
    this.wishListService
      .getById(this.wishListId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.fetchGifts();
          this.fetchDibs();
          this.wishList = data.wishList;
          this.isCurrentUser = this.sessionService.isCurrentUser(this.wishList._user._id);
        },
        (err: any) => {
          // If 403, show cannot-view message.
          this.alertService.error(err.error.message);
        }
      );
  }

  private setupDragula(): void {
    // Only drag with specific element:
    this.dragulaService.setOptions('bag-one', {
      moves: (el: any, container: any, handle: any) => {
        return (handle.className === 'gd-drag-handle');
      }
    });

    this.dragulaSubscription = this.dragulaService.dropModel
      .subscribe((value: any) => {
        const updates: Observable<any>[] = [];

        this.gifts.forEach((gift: Gift, i: number) => {
          if (gift.orderInWishList === undefined || gift.orderInWishList !== i) {
            gift.orderInWishList = i;
            updates.push(this.giftService.update(gift));
          }
        });

        // Only update the gifts whose order has changed.
        if (updates.length > 0) {
          this.isLoading = true;

          Observable
            .merge(...updates)
            .first()
            .finally(() => this.isLoading = false)
            .subscribe(
              () => {},
              (err: any) => {
                this.alertService.error(err.error.message);
              },
            );
        }
      });
  }
}
