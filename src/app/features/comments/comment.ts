import {
  User
} from '../users';

export interface Comment {
  body?: string;
  id?: string;
  user?: User;
}
