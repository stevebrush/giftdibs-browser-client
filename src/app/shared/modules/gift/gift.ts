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
  dibs?: Dib[];
  externalUrls?: GiftExternalUrl[];
  imageUrl?: string;
  isReceived?: boolean;
  name?: string;
  priority?: number;
  quantity?: number;
  user?: User;
  wishListId?: string;
}
