import {
  Injectable,
  Type
} from '@angular/core';

import {
  OverlayInstance,
  OverlayService
} from '../overlay';

import {
  ModalConfig
} from './types';

import {
  ModalInstance
} from './modal-instance';

@Injectable()
export class ModalService {
  constructor(
    private overlayService: OverlayService
  ) { }

  public open<T>(
    component: Type<T>,
    config: ModalConfig
  ): ModalInstance<T> {
    const settings = Object.assign({}, {
      showBackdrop: true
    }, config);

    const modalInstance = new ModalInstance<T>();

    config.providers.push({
      provide: ModalInstance,
      useValue: modalInstance
    });

    const overlayInstance: OverlayInstance<T> = this.overlayService.attach(component, settings);

    modalInstance.componentInstance = overlayInstance.componentInstance;

    modalInstance.closed.subscribe(() => {
      overlayInstance.destroy();
    });

    return modalInstance;
  }
}
