import {
  Gift
} from '../../gifts';

export class GiftEditContext {
  constructor(
    public gift?: Gift,
    public wishListId?: string
  ) { }
}
