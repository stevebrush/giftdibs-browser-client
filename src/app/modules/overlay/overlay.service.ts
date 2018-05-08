import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  OnDestroy,
  Type
} from '@angular/core';

import { OverlayConfig } from './overlay-config';
import { OverlayDomAdapterService } from './overlay-dom-adapter.service';
import { OverlayInstance } from './overlay-instance';
import { OverlayComponent } from './overlay.component';

@Injectable()
export class OverlayService implements OnDestroy {
  private host: ComponentRef<OverlayComponent>;

  constructor(
    private adapter: OverlayDomAdapterService,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  public ngOnDestroy(): void {
    this.removeHostComponent();
  }

  public attach<T>(component: Type<T>, config?: OverlayConfig): OverlayInstance<T> {
    this.ensureHostExists();
    return this.host.instance.attach(component, config);
  }

  private createHostComponent(): ComponentRef<OverlayComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(OverlayComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

    this.appRef.attachView(componentRef.hostView);
    this.adapter.appendToBody(domElem);

    return componentRef;
  }

  private ensureHostExists(): ComponentRef<OverlayComponent> {
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    return this.host;
  }

  private removeHostComponent(): void {
    if (this.host) {
      this.appRef.detachView(this.host.hostView);
      this.host.destroy();
      this.host = undefined;
    }

    this.adapter.removeHostElement();
  }
}
