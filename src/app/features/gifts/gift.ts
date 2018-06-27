import {
  Comment
} from '../comments';

import {
  Dib
} from '../dibs';

import {
  User
} from '../users';

import {
  GiftExternalUrl
} from './gift-external-url';

export interface Gift {
  id?: string;
  budget?: number;
  comments?: Comment[];
  dibs?: Dib[];
  externalUrls?: GiftExternalUrl[];
  isReceived?: boolean;
  name?: string;
  priority?: number;
  quantity?: number;
  user?: User;
  wishListId?: string;
}
