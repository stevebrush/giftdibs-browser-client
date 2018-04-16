import {
  Injectable
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class OverlayInstance<T> {
  public componentInstance: T;
  public destroyStream = new Subject();

  public destroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
