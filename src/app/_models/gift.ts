import { ExternalUrl } from './external-url';

export interface Gift {
  _id?: string;
  _user?: string;
  _wishList: string;
  budget?: number;
  externalUrls?: ExternalUrl[];
  isReceived?: boolean;
  name: string;
  orderInWishList?: number;
  priority?: number;
  quantity: number;
}
