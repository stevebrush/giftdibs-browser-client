import { Comment } from './comment';

export interface Gift {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  comments: Comment[];
  recipient: {
    name: string;
  };
}
