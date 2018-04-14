import {
  Injectable,
  Renderer2
} from '@angular/core';

import { AffixConfig } from './affix-config';
// import { WindowRefService } from '../window/window-ref.service';

@Injectable()
export class AffixService {
  constructor(
    private renderer: Renderer2
    // private windowRef: WindowRefService
  ) { }

  public affixTo(subject: any, target: any, config?: AffixConfig) {
    const targetRect = target.getBoundingClientRect();
    this.renderer.setStyle(subject, 'top', `${targetRect.bottom}px`);
    this.renderer.setStyle(subject, 'left', `${targetRect.left}px`);
  }
}
