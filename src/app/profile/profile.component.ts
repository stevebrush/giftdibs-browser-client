import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/first';

import { AlertService, UserService, SessionService, WishListService } from '../_services';
import { User, WishList } from '../_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public user: User;
  public wishLists: any[];
  public isCreateControlActive = false;
  public isLoading = false;
  public activeWishList: WishList;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private wishListService: WishListService,
    private sessionService: SessionService) { }

  public ngOnInit(): void {
    const sessionUser = this.sessionService.user;
    this.userService
      .getById(sessionUser._id)
      .first()
      .subscribe((user: User) => {
        this.user = user;
        this.updateWishLists();
      });
  }

  public updateWishLists(): void {
    this.userService
      .getWishListsByUserId(this.user._id)
      .first()
      .subscribe(
        (data: any) => {
          this.wishLists = data;
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }

  public toggleCreateControl(): void {
    this.isCreateControlActive = !this.isCreateControlActive;
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
          this.updateWishLists();
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }

  public onCreateSuccess(): void {
    this.updateWishLists();
    this.isCreateControlActive = false;
  }

  public onCreateError(err: any): void {
    this.alertService.error(err.message);
  }

  public onEditSuccess(): void {
    this.activeWishList = undefined;
    this.updateWishLists();
  }

  public setActiveWishList(wishList: WishList): void {
    this.activeWishList = wishList;
  }
}
