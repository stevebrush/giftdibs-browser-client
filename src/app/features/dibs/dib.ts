// import {
//   Gift
// } from '../gifts';

import {
  User
} from '../users';

export interface Dib {
  _id?: string;
  giftId: string;
  quantity: number;
  user: User;
}
