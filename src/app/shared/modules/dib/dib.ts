import {
  User
} from '../user';

export interface Dib {
  dateDelivered?: Date;
  id?: string;
  isAnonymous?: boolean;
  isDelivered?: boolean;
  quantity?: number;
  notes?: string;
  pricePaid?: number;
  user?: User;
}
