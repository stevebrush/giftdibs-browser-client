import { List } from './list';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  thumbnail: string;
  birthday: string;
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
