import {
  Injectable
} from '@angular/core';

import { Alert } from './alert';
import { OverlayService } from '../overlay';
import { AlertComponent } from './alert.component';
import { AlertContext } from './alert-context';

@Injectable()
export class AlertService {
  constructor(
    private overlayService: OverlayService
  ) { }

  public error(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({ text: message, type: 'danger', keepAfterNavigationChange });
  }

  public info(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({ text: message, type: 'info', keepAfterNavigationChange });
  }

  public success(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({ text: message, type: 'success', keepAfterNavigationChange });
  }

  private sendMessage(alert: Alert): void {
    const context = new AlertContext(alert);

    this.overlayService.attach(AlertComponent, {
      providers: [{
        provide: AlertContext,
        useValue: context
      }]
    });
  }
}
