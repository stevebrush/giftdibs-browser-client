import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';

import {
  Subject
} from 'rxjs';

import {
  mergeMap,
  // take,
  takeUntil
} from 'rxjs/operators';

import {
  AlertService
} from '../../modules';

import {
  SessionService
} from '../account/session';

import { WishList } from '../wish-lists/wish-list';
import { WishListService } from '../wish-lists/wish-list.service';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'gd-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public isSessionUser = false;
  public isWishListFormActive = false;
  public user: User;
  public wishLists: WishList[];

  @ViewChild('showWishListFormButton')
  private showWishListFormButton: ElementRef;

  private ngUnsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        mergeMap((params: Params) => {
          this.isLoading = true;
          this.user = undefined;
          this.isSessionUser = false;
          this.changeDetector.markForCheck();
          return this.userService.getById(params.userId);
        }),
        mergeMap((user: User) => {
          this.user = user;
          this.isSessionUser = this.sessionService.isSessionUser(this.user._id);
          return this.wishListService.getAllByUserId(user._id);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (wishLists: WishList[]) => {
          this.wishLists = wishLists;
          this.isLoading = false;
          this.changeDetector.markForCheck();
        },
        () => {
          this.alertService.error('User not found.', true);
          this.router.navigate(['/users']);
        }
      );

    // Show gift detail?
    // this.activatedRoute.queryParams
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe)
    //   )
    //   .subscribe((params: Params) => {
    //     const giftId = params.giftId;
    //     if (giftId) {
    //       this.windowRef.nativeWindow.setTimeout(() => {
    //         this.openGiftDetailModal(giftId);
    //       });
    //     }
    //   });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onShowWishListButtonClick(): void {
    this.isWishListFormActive = true;
  }

  public onWishListFormCancelled(): void {
    this.isWishListFormActive = false;
    this.changeDetector.detectChanges();
    this.showWishListFormButton.nativeElement.focus();
  }

  public onWishListFormSaved(createdId: string): void {
    this.wishListService.getAllByUserId(this.user._id)
      .subscribe((wishLists: WishList[]) => {
        this.wishLists = wishLists;
        this.isWishListFormActive = false;
        this.changeDetector.detectChanges();
        this.showWishListFormButton.nativeElement.focus();
      });
  }

  public onWishListRemoved(wishListId: string): void {
    this.wishLists = this.wishLists.filter((wishList: WishList) => {
      return (wishList._id !== wishListId);
    });
  }

  // public openGiftDetailModal(giftId: string): void {
  //   const context = new GiftDetailContext(giftId);

  //   const modalInstance = this.modalService.open(GiftDetailComponent, {
  //     providers: [{
  //       provide: GiftDetailContext,
  //       useValue: context
  //     }]
  //   });

  //   modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
  //     // Update the gift in the wish list preview.
  //     if (args.reason === 'save') {
  //       const updatedGift = args.data.gift;

  //       this.wishLists.forEach((wishList: WishList, i: number) => {
  //         if (wishList._id === updatedGift.wishListId) {
  //           wishList.gifts.forEach((gift: Gift, j: number) => {
  //             if (gift._id === updatedGift._id) {
  //               this.wishLists[i].gifts[j] = updatedGift;
  //             }
  //           });
  //         }
  //       });

  //       this.changeDetector.markForCheck();
  //     }

  //     // Remove giftId from URL.
  //     this.router.navigate(['.'], {
  //       relativeTo: this.activatedRoute,
  //       queryParams: {}
  //     });
  //   });
  // }
}
