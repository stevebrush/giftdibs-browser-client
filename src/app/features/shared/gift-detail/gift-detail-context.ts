import {
  Injectable
} from '@angular/core';

import {
  Gift
} from '../../gifts';

@Injectable()
export class GiftDetailContext {
  constructor(
    public gift?: Gift
  ) { }
}
