export type DibStatus = 'reserved' | 'purchased' | 'delivered';
export interface Dib {
  _gift: string;
  _id?: string;
  _user: string;
  dateDelivered?: Date;
  pricePaid?: number;
  status?: DibStatus;
}
