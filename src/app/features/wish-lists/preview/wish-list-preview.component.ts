import { Component, OnInit, Input } from '@angular/core';
import { WishList } from '../wish-list';

@Component({
  selector: 'gd-wish-list-preview',
  templateUrl: './wish-list-preview.component.html',
  styleUrls: ['./wish-list-preview.component.scss']
})
export class WishListPreviewComponent implements OnInit {
  @Input()
  public wishList: WishList;

  constructor() { }

  public ngOnInit() {
  }
}
