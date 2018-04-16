import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  ReflectiveInjector,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { OverlayInstance } from './overlay-instance';

@Component({
  selector: 'gd-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {
  @ViewChild('backdrop')
  private backdropRef: TemplateRef<any>;

  @ViewChild('target', { read: ViewContainerRef })
  private targetRef: ViewContainerRef;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  public attach<T>(component: Type<T>, config?: any): OverlayInstance<T> {
    const overlayInstance = new OverlayInstance<T>();

    const defaultProviders = [
      {
        provide: OverlayInstance,
        useValue: overlayInstance
      }
    ];

    const settings = Object.assign({
      showBackdrop: false
    }, config);

    settings.providers = defaultProviders.concat(config.providers);

    const factory = this.resolver.resolveComponentFactory(component);
    const providers = ReflectiveInjector.resolve(settings.providers);
    const injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);
    const componentRef = this.targetRef.createComponent(factory, undefined, injector);

    let backdropRef: EmbeddedViewRef<any>;
    if (settings.showBackdrop) {
      const index = this.targetRef.indexOf(componentRef.hostView);
      backdropRef = this.targetRef.createEmbeddedView(this.backdropRef, undefined, index);
    }

    overlayInstance.componentInstance = componentRef.instance;
    overlayInstance.destroyStream.subscribe(() => {
      componentRef.destroy();
      if (backdropRef) {
        backdropRef.destroy();
      }
    });

    this.changeDetector.markForCheck();

    return overlayInstance;
  }
}
