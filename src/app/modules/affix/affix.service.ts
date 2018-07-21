import {
  ElementRef,
  Injectable,
  Renderer2
} from '@angular/core';

import {
  AffixConfig,
  AffixHorizontalAlignment,
  AffixVerticalAlignment
} from './types';

@Injectable()
export class AffixService {
  constructor(
    private renderer: Renderer2
  ) { }

  public affixTo(
    subject: ElementRef,
    target: ElementRef,
    config?: AffixConfig
  ): void {
    const defaults: AffixConfig = {
      horizontalAlignment: AffixHorizontalAlignment.Left,
      verticalAlignment: AffixVerticalAlignment.Top
    };

    const settings = Object.assign({}, defaults, config);
    const subjectRect = subject.nativeElement.getBoundingClientRect();
    const targetRect = target.nativeElement.getBoundingClientRect();

    let top: number;
    switch (settings.verticalAlignment) {
      default:
      case 'top':
      top = targetRect.top;
      break;

      case 'bottom':
      top = targetRect.bottom;
      break;
    }

    let left: number;
    switch (settings.horizontalAlignment) {
      default:
      case 'left':
      left = targetRect.left;
      break;

      case 'right':
      left = targetRect.right - subjectRect.width;
      break;
    }

    this.renderer.setStyle(subject.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(subject.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(subject.nativeElement, 'position', 'fixed');
  }
}
