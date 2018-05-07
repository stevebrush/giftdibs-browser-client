
import {
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  WindowRefService
} from '../window';

@Injectable()
export class OverlayDomAdapterService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private windowRef: WindowRefService
  ) {
    this.renderer = this.rendererFactory.createRenderer(undefined, undefined);
  }

  public appendToBody(element: any): void {
    const body = this.windowRef.nativeWindow.document.body;
    this.renderer.appendChild(body, element);
  }

  public removeHostElement(): void {
    const documentObj = this.windowRef.nativeWindow.document;
    const hostElement = document.querySelector('gd-overlay');
    this.renderer.removeChild(documentObj.body, hostElement);
  }
}
