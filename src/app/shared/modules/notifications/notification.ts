import { Dib } from '../dib';
import { User } from '../user';

import { NotificationType } from './notification-type';

export interface Notification {
  body?: string;
  dateCreated?: Date;
  follower?: User;
  gift?: {
    comment?: {
      user?: User;
      summary?: string;
    };
    dibs?: Dib[];
    id?: string;
    name?: string;
    user?: User;
  };
  id?: string;
  type?: NotificationType;
  user?: User;
}
