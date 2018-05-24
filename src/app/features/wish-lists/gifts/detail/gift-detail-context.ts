import {
  Injectable
} from '@angular/core';

import {
  Gift
} from '../gift';

@Injectable()
export class GiftDetailContext {
  constructor(
    public gift?: Gift,
    public wishListId?: string
  ) { }
}
