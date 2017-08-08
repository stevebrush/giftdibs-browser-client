import { User } from './user';

export interface WishList {
  _id: string;
  _user: string | User;
  name: string;
}
