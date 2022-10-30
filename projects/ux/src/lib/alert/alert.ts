import { AlertType } from './alert-type';

export interface Alert {
  keepAfterNavigationChange: boolean;
  text: string;
  type: AlertType;
}
