import {
  Injectable
} from '@angular/core';

import { OverlayService } from '../overlay/overlay.service';

import { DropdownMenuConfig } from './dropdown-menu-config';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownMenuContext } from './dropdown-menu-context';
import { DropdownInstance } from './dropdown-instance';

@Injectable()
export class DropdownMenuService {
  constructor(
    private overlayService: OverlayService
  ) { }

  public open(config: DropdownMenuConfig): DropdownInstance<DropdownMenuComponent> {
    const context = new DropdownMenuContext();
    context.config = config;

    const overlayInstance = this.overlayService.attach(DropdownMenuComponent, {
      providers: [{
        provide: DropdownMenuContext,
        useValue: context
      }]
    });

    return overlayInstance;
  }
}
