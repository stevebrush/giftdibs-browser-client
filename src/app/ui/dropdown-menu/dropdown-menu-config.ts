import {
  ElementRef,
  TemplateRef
} from '@angular/core';

import {
  AffixHorizontalAlignment,
  AffixVerticalAlignment
} from '../affix';

import {
  DropdownMenuItem
} from './dropdown-menu-item';

export interface DropdownMenuConfig {
  caller: ElementRef;
  items: DropdownMenuItem[];
  horizontalAlignment?: AffixHorizontalAlignment;
  verticalAlignment?: AffixVerticalAlignment;
  itemTemplate?: TemplateRef<any>;
}
