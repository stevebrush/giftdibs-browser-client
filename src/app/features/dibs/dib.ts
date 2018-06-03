import {
  User
} from '../users';

export interface Dib {
  _id?: string;
  isAnonymous?: boolean;
  quantity: number;
  notes?: string;
  pricePaid?: number;
  user: User;
}
