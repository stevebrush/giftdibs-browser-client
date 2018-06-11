import {
  User
} from '../users';

export interface Friendship {
  id: string;
  friend: User;
  user: User;
}
