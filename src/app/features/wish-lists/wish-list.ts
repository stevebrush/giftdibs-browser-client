import {
  User
} from '../users';

import {
  Gift
} from './gifts';

import { WishListPrivacy } from './wish-list-privacy';

export interface WishList {
  _id?: string;
  gifts?: Gift[];
  name: string;
  privacy?: WishListPrivacy;
  user: User;
}
