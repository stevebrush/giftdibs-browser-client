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
  AlertService,
  ModalClosedEventArgs,
  ModalService,
  ModalSize
} from '@app/ui';

import {
  Subject
} from 'rxjs';

import {
  mergeMap,
  takeUntil
} from 'rxjs/operators';

import {
  SessionService
} from '@app/shared/modules/session';

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

import { WishListCreateContext } from '@app/shared/modules/wish-list-create/wish-list-create-context';
import { WishListCreateComponent } from '@app/shared/modules/wish-list-create/wish-list-create.component';

@Component({
  selector: 'gd-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public isSessionUser = false;
  public user: User;

  // public get privateWishLists(): { wishLists: WishList[] } {
  //   return { wishLists: this._wishLists.filter((wishList: WishList) => wishList.privacy.type !== 'everyone') };
  // }

  // public get wishLists(): { wishLists: WishList[] } {
  //   return { wishLists: this._wishLists.filter((wishList: WishList) => wishList.privacy.type === 'everyone') };
  // }

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
        mergeMap((params: Params) => {
          this.isLoading = true;
          this.user = undefined;
          this.isSessionUser = false;
          this.changeDetector.markForCheck();
          return this.userService.getById(params.userId);
        }),
        mergeMap((user: User) => {
          this.user = user;
          this.isSessionUser = this.sessionService.isSessionUser(this.user.id);
          return this.wishListService.getAllByUserId(user.id);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (wishLists: WishList[]) => {
          this._wishLists = wishLists;
          this.isLoading = false;
          this.changeDetector.markForCheck();
        },
        () => {
          this.alertService.error('User not found.', true);
          this.router.navigate(['/users']);
        }
      );
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public showActive(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.wishListService.getAllByUserId(this.user.id)
      .subscribe((wishLists: WishList[]) => {
        this._wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  public showArchived(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.wishListService.getAllByUserId(this.user.id)
      .subscribe((wishLists: WishList[]) => {
        this._wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  public openWishListCreateModal(): void {
    const context = new WishListCreateContext();

    const modalInstance = this.modalService.open(WishListCreateComponent, {
      providers: [{
        provide: WishListCreateContext,
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
