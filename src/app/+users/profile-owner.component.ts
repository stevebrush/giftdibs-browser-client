import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/models';

@Component({
  selector: 'gd-profile-owner',
  templateUrl: './profile-owner.component.html'
})
export class ProfileOwnerComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  selectedGift: any;

  constructor(
    private router: Router) { }

  ngOnInit() { }

  viewGift(gift: any): void {
    this.router.navigate([], { fragment: gift.id });
  }
}
