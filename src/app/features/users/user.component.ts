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
  takeUntil
} from 'rxjs/operators';

import {
  AlertService
} from '../../modules/alert';

import {
  SessionService
} from '../../modules/session';

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
  public isWishListFormActive = false;
  public isLoading = true;
  public isSessionUser = false;
  public user: User;
  public wishLists: WishList[];

  @ViewChild('showWishListFormButton')
  private showWishListFormButton: ElementRef;
  private ngUnsubscribe = new Subject();

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.route.params
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
}
