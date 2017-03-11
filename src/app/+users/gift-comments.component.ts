import { Component, Input, OnInit } from '@angular/core';
import { Gift } from '../shared/models';
import { SessionService } from '../shared/services';

@Component({
  selector: 'gd-gift-comments',
  templateUrl: './gift-comments.component.html'
})
export class GiftCommentsComponent implements OnInit {
  @Input()
  gift: Gift;

  sessionUser: any;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionUser = this.sessionService.getUser();
  }
}
