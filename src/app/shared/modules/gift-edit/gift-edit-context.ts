import { Gift } from '../gift';

export class GiftEditContext {
  constructor(public gift?: Gift, public wishListId?: string) {}
}
