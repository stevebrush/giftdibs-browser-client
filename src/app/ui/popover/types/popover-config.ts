import {
  ElementRef
} from '@angular/core';

import {
  AffixConfig
} from '@app/ui/affix';

export interface PopoverConfig {
  trigger: ElementRef;
  affix?: AffixConfig;
}
