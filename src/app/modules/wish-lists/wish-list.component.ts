import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
  mergeMap,
  takeUntil
} from 'rxjs/operators';

import {
  GiftEditComponent,
  GiftEditContext
} from '@app/shared/modules/gift-edit';

import {
  SessionService
} from '@app/shared/modules/session';

import {
  WishList,
  WishListService
} from '@app/shared/modules/wish-list';

import {
  WishListEditComponent,
  WishListEditContext
} from '@app/shared/modules/wish-list-edit';

import {
  AlertService,
  ModalClosedEventArgs,
  ModalService,
  ModalSize
} from '@app/ui';

@Component({
  selector: 'gd-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public isSessionUser = false;
  public wishList: WishList;

  private ngUnsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService,
    private router: Router,
    private sessionService: SessionService,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        mergeMap((params: Params) => {
          this.isLoading = true;
          this.wishList = undefined;
          this.isSessionUser = false;
          this.changeDetector.markForCheck();
          return this.wishListService.getById(params.wishListId);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (wishList: WishList) => {
          this.wishList = wishList;
          this.isSessionUser = this.sessionService.isSessionUser(this.wishList.user.id);
          this.isLoading = false;
          this.changeDetector.markForCheck();
        },
        () => {
          this.alertService.error('Wish list not found.', true);
          this.router.navigate(['/']);
        }
      );
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public openWishListEditModal(): void {
    const context = new WishListEditContext();
    context.wishList = this.wishList;

    const modalInstance = this.modalService.open(WishListEditComponent, {
      providers: [{
        provide: WishListEditContext,
        useValue: context
      }],
      size: ModalSize.Small
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.refreshWishList();
      }
    });
  }

  public openGiftCreateModal(): void {
    const context = new GiftEditContext(undefined, this.wishList.id);

    const modalInstance = this.modalService.open(GiftEditComponent, {
      providers: [{
        provide: GiftEditContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        if (!this.wishList.gifts) {
          this.wishList.gifts = [];
        }

        this.refreshWishList();
      }
    });
  }

  private refreshWishList(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();
    this.wishListService.getById(this.wishList.id)
      .subscribe((wishList: WishList) => {
        this.wishList = wishList;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }
}
