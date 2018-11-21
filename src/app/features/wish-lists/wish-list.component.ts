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
} from '@giftdibs/session';

import {
  WishList,
  WishListService
} from '@app/shared/modules/wish-list';

import {
  WishListEditComponent,
  WishListEditContext
} from '@app/shared/modules/wish-list-edit';

import {
  AlertService
} from '@giftdibs/ux';

import {
  ConfirmAnswer,
  ConfirmService,
  DropdownMenuItem,
  ModalClosedEventArgs,
  ModalService,
  ModalSize
} from '@giftdibs/ux';

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
  public menuItems: DropdownMenuItem[];
  public sortMenuItems: DropdownMenuItem[];
  public wishListType: string;
  public privacyType: string;

  public get sortBy(): string {
    return this._sortBy;
  }

  public set sortBy(value: string) {
    this._sortBy = value;
    this.refreshWishList();
  }

  private _sortBy = 'recent';
  private ngUnsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private confirmService: ConfirmService,
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

          return this.wishListService.getById(params.wishListId, this.sortBy);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (wishList: WishList) => {
          this.setupWishList(wishList);

          this.isSessionUser = this.sessionService.isSessionUser(this.wishList.user.id);

          this.menuItems = [
            {
              label: 'Edit wish list',
              action: () => this.openWishListEditModal()
            },
            {
              label: (this.wishList.isArchived) ? 'Unarchive' : 'Archive',
              action: () => {
                if (this.wishList.isArchived) {
                  this.unarchiveWishList();
                } else {
                  this.archiveWishList();
                }
              },
              addSeparatorAfter: true
            },
            {
              label: 'Delete...',
              action: () => this.confirmDelete()
            }
          ];

          this.sortMenuItems = [
            {
              label: 'Recent',
              action: () => {
                this.sortBy = 'recent';
              }
            },
            {
              label: 'Priority',
              action: () => {
                this.sortBy = 'priority';
              }
            }
          ];

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

  private openWishListEditModal(): void {
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

  private confirmDelete(): void {
    this.confirmService.confirm({
      message: 'Are you sure you want to delete this wish list?'
    }, (answer: ConfirmAnswer) => {
      if (answer.type === 'okay') {
        this.wishListService.remove(this.wishList.id)
          .subscribe(
            () => {
              this.alertService.success('Wish list successfully deleted.', true);
              this.router.navigate(['/', 'users', this.wishList.user.id]);
            },
            (err: any) => {
              this.alertService.error(err.error.message);
            }
          );
      }
    });
  }

  private archiveWishList(): void {
    const formData: WishList = {
      isArchived: true
    };

    this.wishListService.update(this.wishList.id, formData)
      .subscribe(
        () => {
          this.alertService.success('Wish list successfully archived.', true);
          this.router.navigate(['/', 'users', this.wishList.user.id]);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  private unarchiveWishList(): void {
    const formData: WishList = {
      isArchived: false
    };

    this.wishListService.update(this.wishList.id, formData)
      .subscribe(
        () => {
          this.alertService.success('Wish list successfully unarchived.', true);
          this.refreshWishList();
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  private refreshWishList(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();
    this.wishListService.getById(this.wishList.id, this.sortBy)
      .subscribe((wishList: WishList) => {
        this.setupWishList(wishList);
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  private setupWishList(wishList: WishList): void {
    this.wishList = wishList;
    this.wishListType = (wishList.type === 'registry') ? 'Registry' : 'Wish list';

    switch (this.wishList.privacy.type) {
      case 'custom':
      this.privacyType = 'Specific friends';
      break;
      case 'everyone':
      this.privacyType = 'Community';
      break;
      case 'me':
      this.privacyType = 'Just me';
      break;
    }
  }
}
