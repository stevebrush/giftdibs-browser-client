import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models';

@Component({
  selector: 'gd-profile-visitor',
  templateUrl: './profile-visitor.component.html'
})
export class ProfileVisitorComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  selectedGift: any;

  constructor(private router: Router) { }

  ngOnInit() {}

  hideModal(): void {
    this.router.navigate([]);
  }

  viewGift(gift: any): void {
    this.router.navigate([], { fragment: gift.id });
  }
}
