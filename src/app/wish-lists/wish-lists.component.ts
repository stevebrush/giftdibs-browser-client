import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/first';

import { AlertService, WishListService } from '../_services';
import { WishList } from '../_models';

@Component({
  selector: 'app-wish-lists',
  templateUrl: './wish-lists.component.html'
})
export class WishListsComponent implements OnInit {
  public wishLists: WishList[];

  constructor(
    private alertService: AlertService,
    private wishListService: WishListService) { }

  public ngOnInit(): void {
    this.wishListService
      .getAll()
      .first()
      .subscribe(
        (data: any) => {
          this.wishLists = data.wishLists;
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }
}
