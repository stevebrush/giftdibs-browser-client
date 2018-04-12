
import {
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import { WindowRefService } from '../shared/window-ref.service';

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
    const body = this.windowRef.getWindow().document.body;
    this.renderer.appendChild(body, element);
    // this.renderer.setStyle(body, 'overflow', 'hidden');
  }

  public removeHostElement(): void {
    const documentObj = this.windowRef.getWindow().document;
    const hostElement = document.querySelector('gd-overlay');
    this.renderer.removeChild(documentObj.body, hostElement);
    // this.renderer.removeStyle(documentObj.body, 'overflow');
  }
}
