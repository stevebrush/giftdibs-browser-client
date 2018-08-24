import {
  WishList
} from '../wish-list';

import {
  Gift
} from '../gift';

export class GiftMoveContext {
  constructor(
    public gift: Gift,
    public wishList: WishList
  ) { }
}
