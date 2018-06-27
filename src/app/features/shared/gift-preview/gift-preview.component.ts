// #region imports
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
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
  distinctUntilChanged,
  takeUntil
} from 'rxjs/operators';

import {
  AlertService,
  DropdownMenuItem,
  ModalClosedEventArgs,
  ModalService,
  ModalSize,
  WindowRefService
} from '../../../modules';

import {
  SessionService
} from '../../account/session';

import {
  Gift,
  GiftService
} from '../../gifts';

import {
  WishList,
  WishListBoardService
} from '../../wish-lists';

import {
  GiftDetailComponent,
  GiftDetailContext
} from '../gift-detail';

import {
  GiftEditComponent,
  GiftEditContext
} from '../gift-edit';

import {
  GiftMoveComponent,
  GiftMoveContext
} from '../gift-move';
// #endregion

@Component({
  selector: 'gd-gift-preview',
  templateUrl: './gift-preview.component.html',
  styleUrls: ['./gift-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftPreviewComponent implements OnInit, OnDestroy {
  @Input()
  public gift: Gift;

  @Input()
  public wishList: WishList;

  public isSessionUser = false;

  public menuItems: DropdownMenuItem[] = [
    {
      label: 'Edit',
      action: () => {
        this.openGiftEditModal();
      }
    },
    {
      label: 'Move',
      action: () => {
        this.openGiftMoveModal();
      }
    },
    {
      label: 'Delete',
      action: () => {
        this.deleteGift();
      }
    }
  ];

  private ngUnsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private giftService: GiftService,
    private modalService: ModalService,
    private router: Router,
    private sessionService: SessionService,
    private windowRef: WindowRefService,
    private wishListBoardService: WishListBoardService
  ) { }

  public ngOnInit(): void {
    this.isSessionUser = this.sessionService.isSessionUser(this.wishList.user.id);

    // Show gift detail?
    this.activatedRoute.queryParams
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((params: Params) => {
        const giftId = params.giftId;
        if (giftId) {
          if (this.gift.id === giftId) {
            this.windowRef.nativeWindow.setTimeout(() => {
              this.openGiftDetailModal();
            });
          }
        }
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private openGiftEditModal(): void {
    const context = new GiftEditContext(this.gift, this.wishList.id);

    const modalInstance = this.modalService.open(GiftEditComponent, {
      providers: [{
        provide: GiftEditContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        const updatedGift = args.data.gift;
        this.wishList.gifts[this.wishList.gifts.indexOf(this.gift)] = updatedGift;
        this.gift = updatedGift;
        this.changeDetector.markForCheck();
      }
    });
  }

  private openGiftDetailModal(): void {
    // TODO: Need to create a "wait" component here!
    this.giftService.getById(this.gift.id).subscribe((gift: Gift) => {
      const context = new GiftDetailContext(gift);

      const modalInstance = this.modalService.open(GiftDetailComponent, {
        providers: [{
          provide: GiftDetailContext,
          useValue: context
        }]
      });

      modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
        this.gift = args.data.gift;
        this.changeDetector.markForCheck();
        this.clearGiftIdFromUrl();
      });
    });
  }

  private openGiftMoveModal(): void {
    const context = new GiftMoveContext(
      this.gift,
      this.wishList
    );

    const modalInstance = this.modalService.open(GiftMoveComponent, {
      size: ModalSize.Small,
      providers: [{
        provide: GiftMoveContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        // Notify the board service that wish lists have changed:
        if (args.data.wishListIds) {
          this.wishListBoardService.notifyChange({
            wishListIds: args.data.wishListIds
          });
        }
      }
    });
  }

  private clearGiftIdFromUrl(): void {
    // Remove giftId from URL.
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {}
    });
  }

  private deleteGift(): void {
    this.giftService.remove(this.gift.id).subscribe(
      () => {
        this.wishList.gifts.splice(
          this.wishList.gifts.indexOf(this.gift),
          1
        );
        this.changeDetector.markForCheck();
      },
      (err: any) => {
        this.alertService.error(err.error.message);
      }
    );
  }
}
