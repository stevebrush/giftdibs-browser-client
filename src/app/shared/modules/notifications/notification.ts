import {
  User
} from '../user';

export interface Notification {
  id?: string;
  user?: User;
  body: string;
}
