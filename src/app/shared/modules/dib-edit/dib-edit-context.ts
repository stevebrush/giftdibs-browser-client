import {
  Gift
} from '../gift';

import {
  Dib
} from '../dib';

export class DibEditContext {
  constructor(
    public dib: Dib,
    public gift: Gift
  ) { }
}
