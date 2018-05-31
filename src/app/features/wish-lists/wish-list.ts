import {
  Gift
} from '../gifts';

import {
  User
} from '../users';

import {
  WishListPrivacy
} from './wish-list-privacy';

export interface WishList {
  _id?: string;
  gifts?: Gift[];
  name: string;
  privacy?: WishListPrivacy;
  user: User;
}
