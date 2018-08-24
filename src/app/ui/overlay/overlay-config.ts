import {
  StaticProvider
} from '@angular/core';

export interface OverlayConfig {
  keepAfterNavigationChange?: boolean;
  providers?: StaticProvider[];
  showBackdrop?: boolean;
}
