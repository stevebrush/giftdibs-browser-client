import { Gift } from './gift';

export interface WishList {
  _id: string;
  _user: any;
  name: string;
  gifts?: Gift[];
}
