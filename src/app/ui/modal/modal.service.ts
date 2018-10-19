import {
  Injectable,
  Type
} from '@angular/core';

import {
  OverlayService
} from '../overlay';

import {
  ModalConfig
} from './types';

import {
  ModalInstance
} from './modal-instance';

import {
  ModalWrapperComponent
} from './modal-wrapper.component';

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
      providers: []
    }, config);

    const modalInstance = new ModalInstance<T>();

    const overlayInstance = this.overlayService.attach(
      ModalWrapperComponent,
      {
        showBackdrop: true
      }
    );

    settings.providers.push({
      provide: ModalInstance,
      useValue: modalInstance
    });

    const wrapper = overlayInstance.componentInstance;
    const componentRef = wrapper.attach(component, settings);

    modalInstance.wrapperInstance = wrapper;

    wrapper.closed.subscribe(() => {
      overlayInstance.destroy();
    });

    // modalInstance.closed.subscribe(() => {
    //   wrapper.close();
    // });

    modalInstance.componentInstance = componentRef.instance;

    return modalInstance;
  }
}
