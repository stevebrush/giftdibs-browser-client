import { Gift } from '../gift';
import { User } from '../user';

import { WishListPrivacy } from './wish-list-privacy';
import { WishListType } from './wish-list-type';

export interface WishList {
  dateUpdated?: Date;
  gifts?: Gift[];
  id?: string;
  isArchived?: boolean;
  name?: string;
  privacy?: WishListPrivacy;
  type?: WishListType;
  user?: User;
}
