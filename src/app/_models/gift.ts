import { ExternalUrl } from './external-url';
import { Dib } from './dib';

export interface Gift {
  _id?: string;
  budget?: number;
  dib?: Dib;
  externalUrls?: ExternalUrl[];
  isReceived?: boolean;
  name: string;
  order?: number;
  priority?: number;
}
