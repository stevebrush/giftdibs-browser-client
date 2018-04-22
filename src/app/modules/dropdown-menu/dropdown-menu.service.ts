import {
  Injectable
} from '@angular/core';

import { OverlayService } from '../overlay/overlay.service';

import { DropdownMenuConfig } from './dropdown-menu-config';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownMenuContext } from './dropdown-menu-context';
import { OverlayInstance } from '../overlay/overlay-instance';

@Injectable()
export class DropdownMenuService {
  // private overlayInstance: OverlayInstance<DropdownMenuComponent>;

  constructor(
    private overlayService: OverlayService
  ) { }

  public open(config: DropdownMenuConfig): OverlayInstance<DropdownMenuComponent> {
    // if (this.overlayInstance) {
    //   this.overlayInstance.destroy();
    //   this.overlayInstance = undefined;
    //   return;
    // }

    const context = new DropdownMenuContext();
    context.config = config;

    const overlayInstance = this.overlayService.attach(DropdownMenuComponent, {
      providers: [{
        provide: DropdownMenuContext,
        useValue: context
      }]
    });

    // overlayInstance.destroyStream.subscribe(() => {
    //   overlayInstance = undefined;
    // });

    return overlayInstance;
  }
}
