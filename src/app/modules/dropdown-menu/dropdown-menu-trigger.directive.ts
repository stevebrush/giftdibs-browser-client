import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef
} from '@angular/core';

import {
  AffixHorizontalAlignment
} from '../affix';

import { DropdownMenuConfig } from './dropdown-menu-config';
import { DropdownMenuInstance } from './dropdown-menu-instance';
import { DropdownMenuItem } from './dropdown-menu-item';
import { DropdownMenuService } from './dropdown-menu.service';

@Directive({
  selector: '[gdDropdownMenuTrigger]'
})
export class DropdownMenuTriggerDirective {
  @Input()
  public set menuHorizontalAlignment(value: AffixHorizontalAlignment) {
    this._menuHorizontalAlignment = value;
  }

  public get menuHorizontalAlignment(): AffixHorizontalAlignment {
    return this._menuHorizontalAlignment || 'right';
  }

  @Input()
  public menuItemTemplate: TemplateRef<any>;

  @Input()
  public set menuItems(value: DropdownMenuItem[]) {
    this._menuItems = value;
  }

  public get menuItems(): DropdownMenuItem[] {
    return this._menuItems || [];
  }

  private _menuHorizontalAlignment: AffixHorizontalAlignment;
  private _menuItems: DropdownMenuItem[];
  private menuInstance: DropdownMenuInstance;

  constructor(
    private dropdownMenuService: DropdownMenuService,
    private elementRef: ElementRef
  ) { }

  @HostListener('click')
  public onClick(): void {
    if (this.menuInstance) {
      this.menuInstance.componentInstance.close();
      this.menuInstance = undefined;
      return;
    }

    const config: DropdownMenuConfig = {
      horizontalAlignment: this.menuHorizontalAlignment,
      caller: this.elementRef,
      items: this.menuItems,
      itemTemplate: this.menuItemTemplate
    };

    this.menuInstance = this.dropdownMenuService.open(config);

    this.menuInstance.closed.subscribe(() => {
      this.menuInstance = undefined;
    });
  }
}
