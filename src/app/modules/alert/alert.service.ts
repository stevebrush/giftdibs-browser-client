import {
  Injectable
} from '@angular/core';

import {
  OverlayInstance,
  OverlayService
} from '../overlay';

import { Alert } from './alert';
import { AlertComponent } from './alert.component';
import { AlertContext } from './alert-context';

@Injectable()
export class AlertService {
  private currentInstance: OverlayInstance<AlertComponent>;

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
    if (this.currentInstance) {
      this.currentInstance.destroy();
    }

    const context = new AlertContext(alert);

    this.currentInstance = this.overlayService.attach(AlertComponent, {
      providers: [{
        provide: AlertContext,
        useValue: context
      }]
    });
  }
}
