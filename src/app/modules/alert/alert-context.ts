import {
  Injectable
} from '@angular/core';

import { Alert } from './alert';

@Injectable()
export class AlertContext {
  constructor(
    public alert: Alert
  ) { }
}
