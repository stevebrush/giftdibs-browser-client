import {
  Injectable,
  Type
} from '@angular/core';

import {
  OverlayService
} from '../overlay';
import { ModalConfig } from './modal-config';

@Injectable()
export class ModalService {
  constructor(
    private overlayService: OverlayService
  ) { }

  public open<T>(component: Type<T>, config: ModalConfig): void {
    const settings = Object.assign({}, {
      showBackdrop: true
    }, config);
    this.overlayService.attach(component, settings);
  }
}
