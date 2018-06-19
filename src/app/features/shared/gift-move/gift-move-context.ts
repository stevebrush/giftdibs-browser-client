import {
  Injectable
} from '@angular/core';

import {
  WishList
} from '../../wish-lists';

import {
  Gift
} from '../../gifts';

@Injectable()
export class GiftMoveContext {
  constructor(
    public gift: Gift,
    public wishList: WishList
  ) { }
}
