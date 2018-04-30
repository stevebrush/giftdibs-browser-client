import {
  Injectable
} from '@angular/core';

import {
  OverlayService
} from '../overlay';

import { ConfirmAnswer } from './confirm-answer';
import { ConfirmComponent } from './confirm.component';
import { ConfirmConfig } from './confirm-config';
import { ConfirmContext } from './confirm-context';

@Injectable()
export class ConfirmService {
  constructor(
    private overlayService: OverlayService
  ) { }

  public confirm(config: ConfirmConfig, callback: (answer: ConfirmAnswer) => void): void {
    const context = new ConfirmContext(config);

    const overlayInstance = this.overlayService.attach(ConfirmComponent, {
      providers: [{
        provide: ConfirmContext,
        useValue: context
      }],
      showBackdrop: true
    });

    context.answerStream.subscribe((answer: ConfirmAnswer) => {
      callback(answer);
      overlayInstance.destroy();
    });
  }
}
