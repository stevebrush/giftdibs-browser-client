import {
  Gift
} from '../../gifts';

import {
  Dib
} from '../../dibs';

export class DibEditContext {
  constructor(
    public dib: Dib,
    public gift: Gift
  ) { }
}
