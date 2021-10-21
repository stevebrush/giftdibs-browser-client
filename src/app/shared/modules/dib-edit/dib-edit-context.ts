import { Dib } from '../dib';
import { Gift } from '../gift';

export class DibEditContext {
  constructor(public dib: Dib, public gift: Gift) {}
}
