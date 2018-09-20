import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  fromEvent,
  Observable,
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  AffixService
} from '../affix';

import {
  GD_FOCUSABLE_SELECTORS
} from '../shared';

import {
  WindowRefService
} from '../window';

import {
  PopoverConfig
} from './types';

@Component({
  selector: 'gd-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AffixService
  ]
})
export class PopoverComponent implements OnDestroy {
  public get closed(): Observable<void> {
    return this._closed;
  }

  public isVisible = false;

  @ViewChild('popover')
  private popover: ElementRef;

  @ViewChild('target', { read: ViewContainerRef })
  private targetRef: ViewContainerRef;

  private config: PopoverConfig;
  private focusableElements: any[];
  private ngUnsubscribe = new Subject();

  private _closed = new EventEmitter<void>();

  constructor(
    public elementRef: ElementRef,
    private affixService: AffixService,
    private changeDetector: ChangeDetectorRef,
    private windowRef: WindowRefService
  ) { }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this._closed.complete();
  }

  public attach(templateRef: TemplateRef<any>, config?: PopoverConfig): void {
    this.targetRef.createEmbeddedView(templateRef);
    this.config = config;
    this.addEventListeners();
    this.positionPopover();
    this.changeDetector.markForCheck();
  }

  public close(): void {
    this._closed.next();
    this._closed.complete();
    this.changeDetector.markForCheck();
  }

  public focusHostElement(): void {
    this.popover.nativeElement.focus();
  }

  private positionPopover(): void {
    this.windowRef.nativeWindow.setTimeout(() => {
      this.affixService.affixTo(
        this.elementRef,
        this.config.trigger,
        this.config.affix
      );

      this.isVisible = true;
      this.changeDetector.markForCheck();
    });
  }

  private assignFocusableElements(): void {
    const elements: HTMLElement[] = [].slice.call(
      this.elementRef.nativeElement.querySelectorAll(GD_FOCUSABLE_SELECTORS)
    );

    const focusableElements = elements
      .filter(element => this.isFocusable(element))
      .filter(element => element.tabIndex !== -1);

    this.focusableElements = focusableElements;
  }

  private isFocusable(element: HTMLElement): boolean {
    // Determines if the element is visible and interactable.
    return !!(
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  }

  private focusTriggerButton(): void {
    this.config.trigger.nativeElement.focus();
  }

  private addEventListeners(): void {
    const nativeWindow = this.windowRef.nativeWindow;
    const popoverElement = this.elementRef.nativeElement;

    let isLastButtonFocused = false;

    nativeWindow.setTimeout(() => {
      // Close the menu after any click event.
      // (Timeout needed so the click is not registered on the caller button.)
      fromEvent(nativeWindow, 'click')
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(() => {
          this.close();
        });

      // Get a list of all focusable elements in the popover.
      this.assignFocusableElements();
    });

    fromEvent(popoverElement, 'click')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        event.stopPropagation();
      });

    fromEvent(popoverElement, 'keydown')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();

        // Close the menu if the last item is focused and the tab key is pressed.
        if (key === 'tab' && isLastButtonFocused) {
          this.close();
          this.focusTriggerButton();
          event.preventDefault();
          event.stopPropagation();
        }
      });

    // Close the menu with escape key.
    fromEvent(popoverElement, 'keyup')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();
        if (key === 'escape') {
          this.close();
          this.focusTriggerButton();
        }
      });

    fromEvent(nativeWindow, 'scroll')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.positionPopover();
      });

    fromEvent(nativeWindow, 'resize')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.positionPopover();
      });

    // This will check if the focus leaves the document.
    fromEvent(popoverElement, 'focusin')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        isLastButtonFocused = (
          event.target ===
          this.focusableElements[this.focusableElements.length - 1]
        );
      });
  }
}
