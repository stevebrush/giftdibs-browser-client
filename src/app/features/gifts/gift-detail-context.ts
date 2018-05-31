import {
  Injectable
} from '@angular/core';

@Injectable()
export class GiftDetailContext {
  constructor(
    public giftId?: string
  ) { }
}
