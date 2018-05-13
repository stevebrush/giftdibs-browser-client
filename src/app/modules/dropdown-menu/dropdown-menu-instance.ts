import {
  Subject
} from 'rxjs';

import {
  OverlayInstance
} from '../overlay';

import { DropdownMenuComponent } from './dropdown-menu.component';

export class DropdownMenuInstance {
  public componentInstance: DropdownMenuComponent;
  public closeStream = new Subject<void>();

  constructor(
    private overlayInstance: OverlayInstance<DropdownMenuComponent>
  ) {
    this.componentInstance = this.overlayInstance.componentInstance;

    this.overlayInstance.destroyStream.subscribe(() => {
      this.closeStream.next();
      this.closeStream.complete();
    });
  }
}
