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

import {
  ModalWrapperComponent
} from './modal-wrapper.component';

export class ModalInstance<T> {
  public componentInstance: T;
  public set wrapperInstance(value: ModalWrapperComponent) {
    this._wrapperInstance = value;
    // Wait for the wrapper closed animation to complete before triggering closed event.
    value.closed.subscribe(() => {
      this._closed.emit(this.closedEventArgs);
      this._closed.complete();
    });
  }

  public get closed(): Observable<ModalClosedEventArgs> {
    return this._closed;
  }

  private closedEventArgs: ModalClosedEventArgs;

  private _closed = new EventEmitter<ModalClosedEventArgs>();
  private _wrapperInstance: ModalWrapperComponent;

  public close(
    reason: ModalClosedEventReason = 'cancel',
    data?: any
  ): void {
    this.closedEventArgs = { reason, data };
    this._wrapperInstance.close();
  }
}
