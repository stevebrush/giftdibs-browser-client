import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from '@giftdibs/session';
import { AlertService } from '@giftdibs/ux';
import { ModalClosedEventArgs, ModalService, ModalSize } from '@giftdibs/ux';

import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User, UserService } from 'src/app/shared/modules/user';
import { WishList } from 'src/app/shared/modules/wish-list';
import { WishListService } from 'src/app/shared/modules/wish-list';
import {
  WishListEditComponent,
  WishListEditContext,
} from 'src/app/shared/modules/wish-list-edit';

@Component({
  selector: 'gd-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public isSessionUser = false;
  public isArchivedViewActive = false;
  public user: User;

  public get wishLists(): { wishLists: WishList[] } {
    return { wishLists: this._wishLists };
  }

  private ngUnsubscribe = new Subject<void>();

  private _wishLists: WishList[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService,
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private wishListService: WishListService
  ) {}

  public ngOnInit(): void {
    combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: Params[]) => {
        const params = result[0];
        const queryParams = result[1];

        // Reset the view.
        this.isLoading = true;
        this.user = undefined;
        this.isSessionUser = false;
        this.changeDetector.markForCheck();

        if (params.userId) {
          this.userService
            .getById(params.userId)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
              (user) => {
                this.user = user;
                this.isSessionUser = this.sessionService.isSessionUser(
                  this.user.id
                );
                this.wishListService
                  .getAllByUserId(user.id)
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(
                    (wishLists) => {
                      this._wishLists = wishLists;

                      // Automatically open the new wish list modal?
                      if (
                        this.isSessionUser &&
                        queryParams.action === 'new_wish_list'
                      ) {
                        this.openWishListEditModal();
                      }

                      this.isLoading = false;
                      this.changeDetector.markForCheck();
                    },
                    () => {
                      this.isLoading = false;
                      this.changeDetector.markForCheck();
                    }
                  );
              },
              () => {
                this.alertService.error('User not found.', true);
                this.router.navigate(['/']);
              }
            );
        } else {
          // Redirect to session user's profile if invalid route.
          this.router.navigate(['/users', this.sessionService.user.id], {
            queryParamsHandling: 'merge',
          });
        }
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public showActive(): void {
    this._wishLists = [];
    this.isLoading = true;
    this.isArchivedViewActive = false;
    this.changeDetector.markForCheck();

    this.wishListService
      .getAllByUserId(this.user.id)
      .subscribe((wishLists: WishList[]) => {
        this._wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  public showArchived(): void {
    this._wishLists = [];
    this.isLoading = true;
    this.isArchivedViewActive = true;
    this.changeDetector.markForCheck();

    this.wishListService
      .getArchivedByUserId(this.user.id)
      .subscribe((wishLists: WishList[]) => {
        this._wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  public openWishListEditModal(): void {
    const context = new WishListEditContext();

    const modalInstance = this.modalService.open(WishListEditComponent, {
      providers: [
        {
          provide: WishListEditContext,
          useValue: context,
        },
      ],
      size: ModalSize.Small,
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.refreshWishLists();
      }
    });
  }

  public onWishListRemoved(): void {
    this.refreshWishLists();
  }

  private refreshWishLists(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.wishListService
      .getAllByUserId(this.user.id)
      .subscribe((wishLists: WishList[]) => {
        this._wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }
}
