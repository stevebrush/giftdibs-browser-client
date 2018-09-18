import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'gd-wish-list',
  templateUrl: './wish-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListComponent { }
