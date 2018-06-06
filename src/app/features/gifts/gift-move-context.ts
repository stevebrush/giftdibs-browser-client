import {
  Injectable
} from '@angular/core';

import {
  WishList
} from '../wish-lists';

import {
  Gift
} from './gift';

@Injectable()
export class GiftMoveContext {
  constructor(
    public gift: Gift,
    public wishList: WishList
  ) { }
}
