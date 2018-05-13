import {
  Subject
} from 'rxjs';

import { ConfirmAnswer } from './confirm-answer';
import { ConfirmConfig } from './confirm-config';

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
