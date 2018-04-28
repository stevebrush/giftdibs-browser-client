import {
  User
} from '../user';

export interface Friendship {
  _id: string;
  friend: User;
  user: User;
}
