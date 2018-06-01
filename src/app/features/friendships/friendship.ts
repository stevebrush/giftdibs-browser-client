import {
  User
} from '../users';

export interface Friendship {
  _id: string;
  friend: User;
  user: User;
}
