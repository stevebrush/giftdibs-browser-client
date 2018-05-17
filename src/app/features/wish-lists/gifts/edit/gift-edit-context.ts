import {
  Injectable
} from '@angular/core';

import {
  Gift
} from '../gift';

@Injectable()
export class GiftEditContext {
  constructor(
    public gift?: Gift,
    public wishListId?: string
  ) { }
}
