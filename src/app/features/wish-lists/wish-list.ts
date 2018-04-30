import {
  User
} from '../users';

export interface WishList {
  _id?: string;
  name: string;
  user: User;
}
