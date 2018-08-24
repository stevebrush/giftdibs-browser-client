import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef
} from '@angular/core';

import {
  AffixHorizontalAlignment,
  AffixVerticalAlignment
} from '../affix';

import {
  OverlayInstance,
  OverlayService
} from '../overlay';

import {
  GdPopoverComponent
} from './popover.component';

@Directive({
  selector: '[gdPopover]'
})
export class GdPopoverDirective {
  @Input()
  public gdPopover: TemplateRef<any>;

  @Input()
  public gdPopoverHorizontalAlignment: AffixHorizontalAlignment;

  @Input()
  public gdPopoverVerticalAlignment: AffixVerticalAlignment;

  private overlayInstance: OverlayInstance<GdPopoverComponent>;

  constructor(
    private elementRef: ElementRef,
    private overlayService: OverlayService
  ) { }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: any): void {
    const key = event.key.toLowerCase();
    if (this.overlayInstance && key === 'tab') {
      this.overlayInstance.componentInstance.focusHostElement();
      event.preventDefault();
    }
  }

  @HostListener('click')
  public onClick(): void {
    if (this.overlayInstance) {
      this.overlayInstance.componentInstance.close();
      return;
    }

    this.overlayInstance = this.overlayService.attach(
      GdPopoverComponent
    );

    this.overlayInstance.componentInstance.attach(this.gdPopover, {
      trigger: this.elementRef,
      affix: {
        horizontalAlignment: this.gdPopoverHorizontalAlignment,
        verticalAlignment: this.gdPopoverVerticalAlignment
      }
    });

    this.overlayInstance.componentInstance.closed.subscribe(() => {
      this.overlayInstance.destroy();
    });

    this.overlayInstance.destroyed.subscribe(() => {
      this.overlayInstance = undefined;
    });
  }
}
