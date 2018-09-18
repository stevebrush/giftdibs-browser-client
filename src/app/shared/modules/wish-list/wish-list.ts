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
  id?: string;
  gifts?: Gift[];
  name: string;
  privacy?: WishListPrivacy;
  user: User;
}
