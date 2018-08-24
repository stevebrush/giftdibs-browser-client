import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  AnimationEvent
} from '@angular/animations';

import {
  Observable
} from 'rxjs';

import {
  gdAnimationEmerge
} from '../animation';

import {
  ModalConfig,
  ModalSize
} from './types';

@Component({
  selector: 'gd-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    gdAnimationEmerge
  ]
})
export class ModalWrapperComponent implements OnDestroy {
  public get closed(): Observable<void> {
    return this._closed;
  }

  public get animationState(): string {
    return (this.isOpen) ? 'open' : 'closed';
  }

  public get size(): ModalSize {
    return this._size || ModalSize.Medium;
  }

  public set size(value: ModalSize) {
    this._size = value;
  }

  @ViewChild('target', { read: ViewContainerRef })
  private targetRef: ViewContainerRef;

  private isOpen = false;

  private _closed = new EventEmitter<void>();
  private _size: ModalSize;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  public ngOnDestroy(): void {
    this._closed.complete();
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'closed') {
      this._closed.emit();
      this._closed.complete();
    }
  }

  public attach<T>(component: Type<T>, config: ModalConfig): ComponentRef<T> {
    const injector = Injector.create({
      providers: config.providers,
      parent: this.injector
    });

    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = this.targetRef.createComponent(factory, undefined, injector);

    this.isOpen = true;
    this.size = config.size;
    this.changeDetector.markForCheck();

    return componentRef;
  }

  public close(): void {
    this.isOpen = false;
    this.changeDetector.markForCheck();
  }
}
