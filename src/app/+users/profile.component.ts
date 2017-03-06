import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Component({
  selector: 'gd-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  activeGift: any;

  constructor(private router: Router) { }

  ngOnInit() {}

  hideModal(): void {
    this.router.navigate([]);
  }

  viewGift(gift: any): void {
    this.router.navigate([], { fragment: gift.id });
  }
}
