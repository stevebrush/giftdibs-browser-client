import {
  Gift
} from '../gifts';

import {
  Dib
} from './dib';

export class DibEditContext {
  constructor(
    public dib: Dib,
    public gift: Gift
  ) { }
}
