import { User } from '../user';

export interface Dib {
  dateDelivered?: Date;
  dateUpdated?: Date;
  id?: string;
  isAnonymous?: boolean;
  quantity?: number;
  notes?: string;
  pricePaid?: number;
  user?: User;
}
