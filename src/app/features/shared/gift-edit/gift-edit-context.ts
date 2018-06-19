import {
  Injectable
} from '@angular/core';

import {
  Gift
} from '../../gifts';

@Injectable()
export class GiftEditContext {
  constructor(
    public gift?: Gift,
    public wishListId?: string
  ) { }
}
