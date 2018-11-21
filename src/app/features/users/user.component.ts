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
  AlertService
} from '@giftdibs/ux';

import {
  ModalClosedEventArgs,
  ModalService,
  ModalSize
} from '@giftdibs/ux';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  SessionService
} from '@giftdibs/session';

import {
  User,
  UserService
} from '@app/shared/modules/user';

import {
  WishList
} from '@app/shared/modules/wish-list';

import {
  WishListService
} from '@app/shared/modules/wish-list';

import {
  WishListEditComponent,
  WishListEditContext
} from '@app/shared/modules/wish-list-edit';

@Component({
  selector: 'gd-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public isSessionUser = false;
  public isArchivedViewActive = false;
  public user: User;

  public get wishLists(): { wishLists: WishList[] } {
    return { wishLists: this._wishLists };
  }

  private ngUnsubscribe = new Subject();

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
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((params: Params) => {
        // Reset the view.
        this.isLoading = true;
        this.user = undefined;
        this.isSessionUser = false;
        this.changeDetector.markForCheck();

        if (params.userId) {
          this.userService.getById(params.userId)
            .pipe(
              takeUntil(this.ngUnsubscribe)
            )
            .subscribe((user) => {
              this.user = user;
              this.isSessionUser = this.sessionService.isSessionUser(this.user.id);
              this.wishListService.getAllByUserId(user.id)
                .pipe(
                  takeUntil(this.ngUnsubscribe)
                )
                .subscribe((wishLists) => {
                  this._wishLists = wishLists;
                  this.isLoading = false;
                  this.changeDetector.markForCheck();
                }, () => {
                  this.isLoading = false;
                  this.changeDetector.markForCheck();
                });
            }, (err: any) => {
              this.alertService.error('User not found.', true);
              this.router.navigate(['/']);
            });
        } else {
          this.router.navigate([
            '/users',
            this.sessionService.user.id
          ]);
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

    this.wishListService.getAllByUserId(this.user.id)
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

    this.wishListService.getArchivedByUserId(this.user.id)
      .subscribe((wishLists: WishList[]) => {
        this._wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  public openWishListEditModal(): void {
    const context = new WishListEditContext();

    const modalInstance = this.modalService.open(WishListEditComponent, {
      providers: [{
        provide: WishListEditContext,
        useValue: context
      }],
      size: ModalSize.Small
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.refreshWishLists();
      }
    });
  }

  private refreshWishLists(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.wishListService.getAllByUserId(this.user.id)
      .subscribe((wishLists: WishList[]) => {
        this._wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }
}
