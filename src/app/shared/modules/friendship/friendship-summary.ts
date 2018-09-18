import {
  User
} from '../user';

export interface FriendshipSummary {
  following?: User[];
  followers?: User[];
}
