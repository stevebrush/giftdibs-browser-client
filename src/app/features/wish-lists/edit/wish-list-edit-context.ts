import {
  Injectable
} from '@angular/core';

import {
  WishList
} from '../wish-list';

@Injectable()
export class WishListEditContext {
  public wishList: WishList;
}
