export interface Gift {
  _id?: string;
  name: string;
  externalUrls?: [{
    price?: number;
    url: string;
    dateScraped: Date;
  }];
  budget?: number;
}
