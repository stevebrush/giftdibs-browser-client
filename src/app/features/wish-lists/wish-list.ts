import {
  User
} from '../users';

import { WishListPrivacy } from './wish-list-privacy';

export interface WishList {
  _id?: string;
  name: string;
  privacy?: WishListPrivacy;
  user: User;
}
