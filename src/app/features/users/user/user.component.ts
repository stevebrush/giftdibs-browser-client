import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

import { AlertService } from '../../../modules/alert/alert.service';

import {
  SessionService
} from '../../../modules/session';

import { User } from '../user';
import { UserService } from '../user.service';
import { WishList } from '../../wish-lists/wish-list';
import { WishListService } from '../../wish-lists/wish-list.service';

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
      .mergeMap((params: Params) => {
        this.isLoading = true;
        this.user = undefined;
        this.isSessionUser = false;
        this.changeDetector.markForCheck();
        return this.userService.getById(params.userId);
      })
      .mergeMap((user: User) => {
        this.user = user;
        this.isSessionUser = this.sessionService.isSessionUser(this.user._id);
        return this.wishListService.getAllByUserId(user._id);
      })
      .takeUntil(this.ngUnsubscribe)
      .subscribe((wishLists: WishList[]) => {
        this.wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }, () => {
        this.alertService.error('User not found.', true);
        this.router.navigate(['/users']);
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onShowWishListButtonClick(): void {
    this.isWishListFormActive = true;
  }

  public onWishListFormCancel(): void {
    this.isWishListFormActive = false;
    this.changeDetector.detectChanges();
    this.showWishListFormButton.nativeElement.focus();
  }

  public onWishListFormSuccess(wishList: WishList): void {
    this.wishLists.push(wishList);
    this.isWishListFormActive = false;
    this.changeDetector.detectChanges();
    this.showWishListFormButton.nativeElement.focus();
  }
}
