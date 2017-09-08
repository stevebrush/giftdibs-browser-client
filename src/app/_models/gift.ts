export interface Gift {
  _id?: string;
  budget?: number;
  externalUrls?: [{
    price?: number;
    url: string;
    dateScraped: Date;
  }];
  isReceived?: boolean;
  name: string;
}
