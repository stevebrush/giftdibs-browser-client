import {
  User
} from '../users';

export interface Dib {
  id?: string;
  isAnonymous?: boolean;
  quantity: number;
  notes?: string;
  pricePaid?: number;
  user: User;
}
