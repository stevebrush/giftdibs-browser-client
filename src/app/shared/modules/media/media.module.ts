import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaComponent } from './media.component';
import { MediaDetailsComponent } from './media-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MediaComponent,
    MediaDetailsComponent
  ],
  exports: [
    MediaComponent,
    MediaDetailsComponent
  ]
})
export class MediaModule { }
