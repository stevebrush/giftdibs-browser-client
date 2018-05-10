import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef
} from '@angular/core';

import {
  AffixAlignment
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
  public set menuAlignment(value: AffixAlignment) {
    this._menuAlignment = value;
  }

  public get menuAlignment(): AffixAlignment {
    return this._menuAlignment || 'right';
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

  private _menuAlignment: AffixAlignment;
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
      alignment: this.menuAlignment,
      caller: this.elementRef,
      items: this.menuItems,
      itemTemplate: this.menuItemTemplate
    };

    this.menuInstance = this.dropdownMenuService.open(config);

    this.menuInstance.closeStream.subscribe(() => {
      this.menuInstance = undefined;
    });
  }
}
