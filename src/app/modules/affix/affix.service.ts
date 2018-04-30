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

  public affixTo(subject: ElementRef, target: ElementRef, config?: AffixConfig): void {
    const defaults: AffixConfig = {
      alignment: 'left'
    };

    const settings = Object.assign({}, defaults, config);

    const subjectRect = subject.nativeElement.getBoundingClientRect();
    const targetRect = target.nativeElement.getBoundingClientRect();

    let left: number;
    switch (settings.alignment) {
      default:
      case 'left':
      left = targetRect.left;
      break;

      case 'right':
      left = targetRect.right - subjectRect.width;
      break;
    }

    this.renderer.setStyle(subject.nativeElement, 'top', `${targetRect.bottom}px`);
    this.renderer.setStyle(subject.nativeElement, 'left', `${left}px`);
  }
}
