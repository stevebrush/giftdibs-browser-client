import {
  Injectable,
  Type
} from '@angular/core';

import {
  OverlayService, OverlayInstance
} from '../overlay';
import { ModalConfig } from './modal-config';
import { ModalInstance } from './modal-instance';

@Injectable()
export class ModalService {
  constructor(
    private overlayService: OverlayService
  ) { }

  public open<T>(component: Type<T>, config: ModalConfig): ModalInstance<T> {
    const settings = Object.assign({}, {
      showBackdrop: true
    }, config);

    const overlayInstance: OverlayInstance<T> = this.overlayService.attach(component, settings);
    const modalInstance = new ModalInstance<T>(overlayInstance);

    return modalInstance;
  }
}
