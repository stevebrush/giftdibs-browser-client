import {
  Comment
} from '../comment';

import {
  Dib
} from '../dib';

import {
  User
} from '../user';

import {
  GiftExternalUrl
} from './gift-external-url';

export interface Gift {
  id?: string;
  budget?: number;
  comments?: Comment[];
  dateReceived?: Date;
  dibs?: Dib[];
  externalUrls?: GiftExternalUrl[];
  imageUrl?: string;
  name?: string;
  notes?: string;
  priority?: number;
  quantity?: number;
  user?: User;
  wishListId?: string;
}
