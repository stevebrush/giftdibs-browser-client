import {
  ElementRef,
  TemplateRef
} from '@angular/core';

import {
  AffixAlignment
} from '../affix';

import { DropdownMenuItem } from './dropdown-menu-item';

export interface DropdownMenuConfig {
  caller: ElementRef;
  items: DropdownMenuItem[];
  alignment?: AffixAlignment;
  itemTemplate?: TemplateRef<any>;
}
