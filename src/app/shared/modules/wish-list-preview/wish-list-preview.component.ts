import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  WishList
} from '@app/shared/modules/wish-list';

@Component({
  selector: 'gd-wish-list-preview',
  templateUrl: './wish-list-preview.component.html',
  styleUrls: ['./wish-list-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListPreviewComponent implements OnInit {
  @Input()
  public wishList: WishList;

  public thumbnail: string;

  public ngOnInit(): void {
    const gifts = this.wishList.gifts;
    if (gifts && gifts.length) {
      this.thumbnail = gifts[gifts.length - 1].imageUrl;
    }
  }
}
