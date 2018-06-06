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
  takeUntil
} from 'rxjs/operators';

import {
  AlertService,
  DropdownMenuItem,
  ModalClosedEventArgs,
  ModalService,
  ModalSize,
  WindowRefService
} from '../../modules';

import {
  SessionService
} from '../account/session';

import {
  WishList
} from '../wish-lists/wish-list';

import {
  WishListBoardService
} from '../wish-lists/wish-list-board.service';

import { Gift } from './gift';
import { GiftDetailContext } from './gift-detail-context';
import { GiftDetailComponent } from './gift-detail.component';
import { GiftEditContext } from './gift-edit-context';
import { GiftEditComponent } from './gift-edit.component';
import { GiftMoveContext } from './gift-move-context';
import { GiftMoveComponent } from './gift-move.component';
import { GiftService } from './gift.service';
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
    this.isSessionUser = this.sessionService.isSessionUser(this.wishList.user._id);

    // Show gift detail?
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((params: Params) => {
        const giftId = params.giftId;
        if (giftId) {
          if (this.gift._id === giftId) {
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
    const context = new GiftEditContext(this.gift, this.wishList._id);

    const modalInstance = this.modalService.open(GiftEditComponent, {
      providers: [{
        provide: GiftEditContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.gift = args.data.gift;
        this.changeDetector.markForCheck();
      }
    });
  }

  private openGiftDetailModal(): void {
    this.giftService.getById(this.gift._id).subscribe((gift: Gift) => {
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
    this.giftService.remove(this.gift._id).subscribe(
      () => {
        this.wishList.gifts.splice(this.wishList.gifts.indexOf(this.gift), 1);
        this.changeDetector.markForCheck();
      },
      (err: any) => {
        this.alertService.error(err.error.message);
      }
    );
  }
}
