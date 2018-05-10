import {
  Injectable
} from '@angular/core';

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
    const context = new DropdownMenuContext();
    context.config = config;

    const overlayInstance = this.overlayService.attach(DropdownMenuComponent, {
      providers: [{
        provide: DropdownMenuContext,
        useValue: context
      }]
    });

    return new DropdownMenuInstance(overlayInstance);
  }
}
