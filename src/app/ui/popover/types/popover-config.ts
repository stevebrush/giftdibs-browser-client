import {
  ElementRef
} from '@angular/core';

import {
  AffixConfig
} from '../../affix';

export interface GdPopoverConfig {
  trigger: ElementRef;
  affix?: AffixConfig;
}
