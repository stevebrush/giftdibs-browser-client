import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';

import {
  WindowRefService
} from '../window';

const FOCUSABLE_SELECTORS: string = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'embed',
  'iframe',
  'input:not([disabled])',
  'object',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable=true]',
  '[tabindex]'
].join(', ');

@Directive({
  selector: '[gdFocusTrap]'
})
export class FocusTrapDirective implements AfterContentInit, OnDestroy {
  @Input()
  public activateOnLoad = false;

  private get tabIndex(): number {
    return this._tabIndex;
  }

  private set tabIndex(value: number) {
    const maxIndex = this.focusableElements.length - 1;
    if (value > maxIndex) {
      this._tabIndex = 0;
    } else if (value < 0) {
      this._tabIndex = maxIndex;
    } else {
      this._tabIndex = value;
    }
  }

  private _tabIndex = -1;
  private focusableElements: any[];
  private isActive = false;
  private observer: MutationObserver;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private windowRef: WindowRefService
  ) { }

  public ngAfterContentInit(): void {
    if (this.activateOnLoad) {
      this.activateTrap();

      // Focus the host element:
      this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '-1');
      this.elementRef.nativeElement.focus();
    }
  }

  public ngOnDestroy(): void {
    this.deactivateTrap();
  }

  @HostListener('focusin', ['$event'])
  public onFocus(): void {
    if (!this.isActive) {
      this.activateTrap();
    }
  }

  @HostListener('document:click', ['$event'])
  public onWindowFocusIn(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.deactivateTrap();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();

    if (key === 'tab') {
      event.preventDefault();
      event.stopPropagation();

      if (event.shiftKey) {
        this.tabIndex--;
      } else {
        this.tabIndex++;
      }

      this.focusActiveElement();
    }
  }

  private assignFocusableElements(): void {
    const elements: HTMLElement[] = [].slice.call(
      this.elementRef.nativeElement.querySelectorAll(FOCUSABLE_SELECTORS)
    );

    const focusableElements = elements
      .filter(element => this.isVisible(element))
      .filter(element => element.tabIndex !== -1);

    this.focusableElements = focusableElements;
  }

  private createObserver(): void {
    this.observer = new MutationObserver(() => {
      // Reset the focusable elements when the DOM changes.
      this.assignFocusableElements();
    });

    this.observer.observe(this.elementRef.nativeElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  private isVisible(element: HTMLElement): boolean {
    return !!(
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  }

  private focusActiveElement(): void {
    this.windowRef.nativeWindow.setTimeout(() => {
      const element = this.focusableElements[this.tabIndex];
      if (element) {
        element.focus();
      }
    });
  }

  private disconnectObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private activateTrap(): void {
    this.isActive = true;
    this.assignFocusableElements();
    this.createObserver();
  }

  private deactivateTrap(): void {
    this.isActive = false;
    this.disconnectObserver();
  }
}
