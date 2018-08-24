import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  OnDestroy,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  NavigationStart,
  Router
} from '@angular/router';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import { OverlayConfig } from './overlay-config';
import { OverlayInstance } from './overlay-instance';

@Component({
  selector: 'gd-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements OnDestroy {
  @ViewChild('backdrop')
  private backdropRef: TemplateRef<any>;

  @ViewChild('target', { read: ViewContainerRef })
  private targetRef: ViewContainerRef;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private router: Router
  ) { }

  public attach<T>(component: Type<T>, config?: OverlayConfig): OverlayInstance<T> {
    const defaults: OverlayConfig = {
      keepAfterNavigationChange: false,
      showBackdrop: false
    };
    const settings = Object.assign(defaults, config);

    // TODO: Remove instance from providers since it causes scope to bleed?
    // Reason: The entry component that gets inserted into the overlay
    // should work outside of an overlay and be unaware that it is an "overlay".
    const overlayInstance = new OverlayInstance<T>();
    const defaultProviders: any[] = [{
      provide: OverlayInstance,
      useValue: overlayInstance
    }];

    settings.providers = defaultProviders.concat(config && config.providers || []);

    const injector = Injector.create({
      providers: settings.providers,
      parent: this.injector
    });

    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = this.targetRef.createComponent(factory, undefined, injector);

    let backdropRef: EmbeddedViewRef<any>;
    if (settings.showBackdrop) {
      const index = this.targetRef.indexOf(componentRef.hostView);
      backdropRef = this.targetRef.createEmbeddedView(this.backdropRef, undefined, index);
    }

    this.router.events
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          if (settings.keepAfterNavigationChange) {
            settings.keepAfterNavigationChange = false;
          } else {
            overlayInstance.destroy();
          }
        }
      });

    overlayInstance.componentInstance = componentRef.instance;
    overlayInstance.destroyed.subscribe(() => {
      componentRef.destroy();
      if (backdropRef) {
        backdropRef.destroy();
      }
    });

    this.changeDetector.markForCheck();

    return overlayInstance;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
