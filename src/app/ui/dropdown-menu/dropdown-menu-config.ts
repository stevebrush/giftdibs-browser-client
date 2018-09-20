import {
  ElementRef,
  TemplateRef
} from '@angular/core';

import {
  AffixConfig
} from '../affix';

import {
  DropdownMenuItem
} from './dropdown-menu-item';

export interface DropdownMenuConfig {
  caller: ElementRef;
  items: DropdownMenuItem[];
  affix?: AffixConfig;
  itemTemplate?: TemplateRef<any>;
}
