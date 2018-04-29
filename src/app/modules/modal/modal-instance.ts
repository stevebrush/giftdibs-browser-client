import {
  OverlayInstance
} from '../overlay';

export class ModalInstance<T> {
  public componentInstance: T;

  constructor(
    private overlayInstance: OverlayInstance<T>
  ) {
    this.componentInstance = this.overlayInstance.componentInstance;
  }
}
