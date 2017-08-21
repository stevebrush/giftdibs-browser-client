import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/finally';
import { Subscription } from 'rxjs/Subscription';

import { User, WishList } from '../_models';
import { UserService, AlertService, WishListService, SessionService } from '../_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  public isLoading = false;

  public user: User;
  public isCurrentUser = false;

  public wishLists: WishList[];
  public activeWishList: WishList;

  private routeParamSubscription: Subscription;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private wishListService: WishListService,
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.routeParamSubscription = this.route.params
      .subscribe((params: any) => {
        this.userService
          .getById(params.id)
          .first()
          .subscribe(
            (user: User) => {
              this.user = user;
              this.isCurrentUser = this.sessionService.isCurrentUser(this.user._id);
              this.getWishLists();
            },
            (error: any) => {
              if (error.status === 400) {
                this.alertService.error('User not found.', true);
                this.router.navigate(['/']);
              }
            });
      });
  }

  public ngOnDestroy(): void {
    this.routeParamSubscription.unsubscribe();
  }

  public onCreateSuccess(): void {
    this.getWishLists();
  }

  public onEditSuccess(): void {
    this.activeWishList = undefined;
    this.getWishLists();
  }

  public deleteWishList(wishListId: string): void {
    this.isLoading = true;
    this.wishListService
      .remove(wishListId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.alertService.success(data.message);
          this.getWishLists();
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }

  private getWishLists(): void {
    this.wishListService
      .getAllByUserId(this.user._id)
      .first()
      .subscribe((data: any) => this.wishLists = data);
  }
}
