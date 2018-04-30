import {
  ElementRef,
  TemplateRef
} from '@angular/core';

import { AffixAlignment } from '../affix/affix-alignment';

import { DropdownMenuItem } from './dropdown-menu-item';

export interface DropdownMenuConfig {
  caller: ElementRef;
  items: DropdownMenuItem[];
  alignment?: AffixAlignment;
  itemTemplate?: TemplateRef<any>;
}
