import {
  Injectable
} from '@angular/core';

import {
  AffixHorizontalAlignment,
  AffixVerticalAlignment
} from '../affix';

import {
  OverlayService
} from '../overlay';

import { DropdownMenuConfig } from './dropdown-menu-config';
import { DropdownMenuContext } from './dropdown-menu-context';
import { DropdownMenuInstance } from './dropdown-menu-instance';
import { DropdownMenuComponent } from './dropdown-menu.component';

@Injectable()
export class DropdownMenuService {
  constructor(
    private overlayService: OverlayService
  ) { }

  public open(config: DropdownMenuConfig): DropdownMenuInstance {
    const defaults = {
      horizontalAlignment: AffixHorizontalAlignment.Right,
      verticalAlignment: AffixVerticalAlignment.Bottom
    };

    const settings = Object.assign({}, defaults, config);
    const context = new DropdownMenuContext();
    context.config = settings;

    const overlayInstance = this.overlayService.attach(
      DropdownMenuComponent,
      {
        providers: [{
          provide: DropdownMenuContext,
          useValue: context
        }]
      }
    );

    const dropdownInstance = new DropdownMenuInstance(overlayInstance);

    return dropdownInstance;
  }
}
