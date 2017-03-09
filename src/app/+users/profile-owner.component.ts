import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/user';
import { SessionService } from '../shared/services';

@Component({
  selector: 'gd-profile-owner',
  templateUrl: './profile-owner.component.html'
})
export class ProfileOwnerComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  activeGift: any;

  sessionUser: any;

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionUser = this.sessionService.getUser();
    console.log(this.sessionUser);
  }

  hideModal(event): void {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      this.router.navigate([]);
    }
  }

  viewGift(gift: any): void {
    this.router.navigate([], { fragment: gift.id });
  }
}
