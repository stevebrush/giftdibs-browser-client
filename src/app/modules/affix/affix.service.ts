import {
  ElementRef,
  Injectable,
  Renderer2
} from '@angular/core';

import { AffixConfig } from './affix-config';

@Injectable()
export class AffixService {
  constructor(
    private renderer: Renderer2
  ) { }

  public affixTo(subject: ElementRef, target: ElementRef, config?: AffixConfig) {
    const targetRect = target.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(subject.nativeElement, 'top', `${targetRect.bottom}px`);
    this.renderer.setStyle(subject.nativeElement, 'left', `${targetRect.left}px`);
  }
}
