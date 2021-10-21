import { User } from '../user';

export interface Comment {
  body?: string;
  id?: string;
  user?: User;
}
