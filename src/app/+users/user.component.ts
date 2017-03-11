import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { User } from '../shared/models';
import { SessionService, UserService } from '../shared/services';

@Component({
  selector: 'gd-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User;
  selectedGift: any;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  isSessionUser(): boolean {
    const sessionUser = this.sessionService.getUser();
    return (sessionUser.id === this.user.id);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;

      this.route.fragment.subscribe(giftId => {
        if (giftId) {
          const id = +giftId;
          let found;
          this.user.lists.forEach(list => {
            if (!found) {
              found = list.gifts.find(g => g.id === id);
            }
          });

          this.selectedGift = found;
          return;
        }

        this.selectedGift = undefined;
      });
    });
  }
}
