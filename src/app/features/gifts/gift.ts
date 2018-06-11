import {
  Dib
} from '../dibs';

import {
  User
} from '../users';

export interface Gift {
  id?: string;
  budget?: number;
  dibs?: Dib[];
  isReceived?: boolean;
  name?: string;
  quantity?: number;
  user?: User;
  wishListId?: string;
}
