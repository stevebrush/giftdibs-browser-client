import { List } from './list';
import { Gift } from './gift';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  thumbnail: string;
  birthday: string;
  dibs: {
    user?: {
      id: number;
      firstName: string;
      lastName: string;
      thumbnail: string;
    };
    gift?: Gift;
  }[];
  following: {
    id: number;
    firstName: string;
    lastName: string;
    thumbnail: string;
  }[];
  followers: {
    id: number;
    firstName: string;
    lastName: string;
    thumbnail: string;
  }[];
  lists: List[];
}
