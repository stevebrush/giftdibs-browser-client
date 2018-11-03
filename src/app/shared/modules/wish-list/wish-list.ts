import {
  Gift
} from '../gift';

import {
  User
} from '../user';

import {
  WishListPrivacy
} from './wish-list-privacy';

export interface WishList {
  dateUpdated?: Date;
  gifts?: Gift[];
  id?: string;
  isArchived?: boolean;
  name?: string;
  privacy?: WishListPrivacy;
  user?: User;
}
