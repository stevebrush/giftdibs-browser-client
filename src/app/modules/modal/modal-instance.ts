import {
  EventEmitter
} from '@angular/core';

import {
  Observable
} from 'rxjs';

import {
  ModalClosedEventArgs,
  ModalClosedEventReason
} from './types';

export class ModalInstance<T> {
  public componentInstance: T;

  public get closed(): Observable<ModalClosedEventArgs> {
    return this._closed;
  }

  private _closed = new EventEmitter<ModalClosedEventArgs>();

  public close(
    reason: ModalClosedEventReason,
    data?: any
  ): void {
    this._closed.emit({
      data,
      reason
    });
    this._closed.complete();
  }
}
