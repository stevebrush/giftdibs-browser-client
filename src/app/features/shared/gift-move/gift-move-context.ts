import {
  WishList
} from '../../wish-lists';

import {
  Gift
} from '../../gifts';

export class GiftMoveContext {
  constructor(
    public gift: Gift,
    public wishList: WishList
  ) { }
}
