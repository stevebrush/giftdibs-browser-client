import { ExternalUrl } from './external-url';

export interface Gift {
  _id?: string;
  budget?: number;
  externalUrls?: ExternalUrl[];
  isReceived?: boolean;
  name: string;
}
