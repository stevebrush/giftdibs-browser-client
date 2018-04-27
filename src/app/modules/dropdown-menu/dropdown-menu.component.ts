import {
  AfterContentInit,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  TemplateRef,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AffixService } from '../affix/affix.service';

import {
  OverlayInstance
} from '../overlay';

import { WindowRefService } from '../window/window-ref.service';

import { DropdownMenuContext } from './dropdown-menu-context';

@Component({
  selector: 'gd-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AffixService
  ]
})
export class DropdownMenuComponent implements OnInit, AfterContentInit, OnDestroy {
  public items: any[];
  public itemTemplate: TemplateRef<any>;
  public isVisible = false;

  private ngUnsubscribe = new Subject();
  private buttons: any[];

  private get activeIndex(): number {
    return this._activeIndex;
  }

  private set activeIndex(value: number) {
    if (value > this.buttons.length - 1) {
      value = 0;
    }

    if (value < 0) {
      value = this.buttons.length - 1;
    }

    this._activeIndex = value;
  }

  private _activeIndex = 0;

  constructor(
    public context: DropdownMenuContext,
    private affixService: AffixService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private overlayInstance: OverlayInstance<any>,
    private windowRef: WindowRefService
  ) { }

  public ngOnInit(): void {
    const hostElement = this.elementRef.nativeElement;
    const nativeWindow = this.windowRef.nativeWindow;

    let isLastButtonFocused = false;

    this.items = this.context.config.items;
    this.itemTemplate = this.context.config.itemTemplate;

    // Close the menu when clicking the window.
    // (Timeout needed so the click is not registered on the caller button.)
    nativeWindow.setTimeout(() => {
      Observable
        .fromEvent(nativeWindow, 'click')
        .takeUntil(this.ngUnsubscribe)
        .subscribe(() => {
          this.close();
        });
    });

    // Close the menu with escape key.
    Observable
      .fromEvent(hostElement, 'keyup')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();
        if (key === 'escape') {
          this.close();
        }
      });

    // Navigate the items with arrow keys.
    Observable
      .fromEvent(hostElement, 'keydown')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();

        if (key === 'arrowdown' || key === 'down') {
          this.activeIndex++;
          this.focusActiveButton();
          event.preventDefault();
        }

        if (key === 'arrowup' || key === 'up') {
          this.activeIndex--;
          this.focusActiveButton();
          event.preventDefault();
        }

        // Close the menu if the last item is focused and the tab key is pressed.
        if (key === 'tab' && isLastButtonFocused) {
          this.close();
          event.preventDefault();
          event.stopPropagation();
        }
      });

    // This will check if the focus leaves the document.
    Observable
      .fromEvent(hostElement, 'focusin')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: any) => {
        isLastButtonFocused = event.target === this.buttons[this.buttons.length - 1];
      });

    Observable
      .fromEvent(nativeWindow, 'scroll')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.positionMenu();
      });

    Observable
      .fromEvent(nativeWindow, 'resize')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.positionMenu();
      });

    this.changeDetector.markForCheck();
  }

  public ngAfterContentInit(): void {
    this.windowRef.nativeWindow.setTimeout(() => {
      this.positionMenu();
      this.buttons = [].slice.call(this.elementRef.nativeElement.querySelectorAll('.gd-button'));
      this.buttons[0].focus();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public close(): void {
    this.overlayInstance.destroy();
    this.context.config.caller.nativeElement.focus();
  }

  private focusActiveButton(): void {
    this.buttons[this.activeIndex].focus();
  }

  private positionMenu(): void {
    this.affixService.affixTo(
      this.elementRef,
      this.context.config.caller,
      {
        alignment: this.context.config.alignment || 'left'
      }
    );

    this.isVisible = true;
    this.changeDetector.detectChanges();
  }
}
