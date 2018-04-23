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
import { OverlayInstance } from '../overlay/overlay-instance';
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

  public ngOnInit() {
    const hostElement = this.elementRef.nativeElement;

    this.items = this.context.config.items;
    this.itemTemplate = this.context.config.itemTemplate;

    // Close the menu when clicking the window.
    // (Timeout needed so the click is not registered on the caller button.)
    this.windowRef.nativeWindow.setTimeout(() => {
      Observable
        .fromEvent(this.windowRef.nativeWindow, 'click')
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
        }

        if (key === 'arrowup' || key === 'up') {
          this.activeIndex--;
          this.focusActiveButton();
        }
      });

    // This will check if the focus leaves the document.
    Observable
      .fromEvent(this.windowRef.nativeWindow.document, 'focusout')
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: any) => {
        this.windowRef.nativeWindow.setTimeout(() => {
          if (!document.hasFocus()) {
            this.close();
          }
        });
      });

    this.changeDetector.markForCheck();
  }

  public ngAfterContentInit() {
    this.windowRef.nativeWindow.setTimeout(() => {
      this.buttons = [].slice.call(this.elementRef.nativeElement.querySelectorAll('.gd-button'));
      this.buttons[0].focus();

      // Move the menu into position.
      this.affixService.affixTo(
        this.elementRef,
        this.context.config.caller,
        {
          alignment: this.context.config.alignment || 'left'
        }
      );
    });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public close() {
    this.overlayInstance.destroy();
    this.context.config.caller.nativeElement.focus();
  }

  private focusActiveButton() {
    this.buttons[this.activeIndex].focus();
  }
}
