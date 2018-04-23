import {
  ElementRef,
  TemplateRef
} from '@angular/core';

import { AffixAlignment } from '../affix/affix-alignment';

export interface DropdownMenuConfig {
  caller: ElementRef;
  items: { action: Function, label: string, addSeparatorAfter?: boolean }[];
  alignment?: AffixAlignment;
  itemTemplate?: TemplateRef<any>;
}
