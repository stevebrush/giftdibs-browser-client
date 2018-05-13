import {
  Injectable
} from '@angular/core';

import {
  Subject
} from 'rxjs';

@Injectable()
export class OverlayInstance<T> {
  public componentInstance: T;
  public destroyStream = new Subject();

  public destroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
