import {
  Gift
} from '../gift';

export class GiftMoveContext {
  constructor(
    public gift: Gift,
    public wishListId: string
  ) { }
}
