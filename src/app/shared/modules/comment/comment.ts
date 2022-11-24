import { User } from '../user';

export interface Comment {
  body?: string;
  dateUpdated?: Date;
  id?: string;
  user?: User;
}
