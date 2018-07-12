import {
  User
} from '../users';

export interface Notification {
  id?: string;
  user?: User;
  body: string;
}
