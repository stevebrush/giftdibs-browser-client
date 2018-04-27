import {
  Injectable
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { ConfirmAnswer } from './confirm-answer';
import { ConfirmConfig } from './confirm-config';

@Injectable()
export class ConfirmContext {
  public answerStream = new Subject<ConfirmAnswer>();

  constructor(
    public config: ConfirmConfig
  ) { }

  public answer(answer: ConfirmAnswer): void {
    this.answerStream.next(answer);
    this.answerStream.complete();
  }
}
