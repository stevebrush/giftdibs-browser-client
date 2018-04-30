import {
  EventEmitter
} from '@angular/core';

import {
  OverlayInstance
} from '../overlay';

export class ModalInstance<T> {
  public componentInstance: T;
  public closed = new EventEmitter<void>();

  constructor(
    private overlayInstance: OverlayInstance<T>
  ) {
    this.componentInstance = this.overlayInstance.componentInstance;
    this.overlayInstance.destroyStream.subscribe(() => {
      this.closed.emit();
      this.closed.complete();
    });
  }
}
