import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User, Gift } from '../shared/models';

@Component({
  selector: 'gd-gift-modal',
  templateUrl: './gift-modal.component.html'
})
export class GiftModalComponent implements OnInit {
  @Input()
  gift: Gift;

  constructor(
    private router: Router) { }

  ngOnInit() { }

  hideModal(event): void {
    this.router.navigate([]);
  }
}
