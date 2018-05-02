import {
  User
} from '../users';

export interface WishListPrivacy {
  type: 'everyone' | 'friends' | 'me' | 'custom';
  _allow?: User[];
}
