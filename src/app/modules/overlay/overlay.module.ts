import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { OverlayDomAdapterService } from './overlay-dom-adapter.service';
import { WindowRefService } from '../window/window-ref.service';
import { OverlayService } from './overlay.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OverlayComponent
  ],
  entryComponents: [
    OverlayComponent
  ],
  providers: [
    OverlayDomAdapterService,
    OverlayService,
    WindowRefService
  ]
})
export class OverlayModule { }
