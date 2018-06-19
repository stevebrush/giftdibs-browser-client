import {
  Injectable
} from '@angular/core';

import {
  WishList
} from '../../wish-lists';

@Injectable()
export class WishListEditContext {
  public wishList: WishList;
}
