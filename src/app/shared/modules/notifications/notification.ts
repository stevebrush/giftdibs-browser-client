import {
  User
} from '../user';

import {
  NotificationType
} from './notification-type';

export interface Notification {
  body?: string;
  id?: string;
  type?: NotificationType;
  user?: User;
}
