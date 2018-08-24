import {
  User
} from '../user';

export interface Friendship {
  id: string;
  friend: User;
  user: User;
}
