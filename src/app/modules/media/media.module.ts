import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media.component';
import { MediaHeaderComponent } from './media-header.component';
import { MediaHeadingComponent } from './media-heading.component';
import { MediaContentComponent } from './media-content.component';
import { MediaBodyComponent } from './media-body.component';
import { MediaThumbnailComponent } from './media-thumbnail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MediaComponent,
    MediaHeaderComponent,
    MediaHeadingComponent,
    MediaContentComponent,
    MediaBodyComponent,
    MediaThumbnailComponent
  ],
  declarations: [
    MediaComponent,
    MediaHeaderComponent,
    MediaHeadingComponent,
    MediaContentComponent,
    MediaBodyComponent,
    MediaThumbnailComponent
  ]
})
export class MediaModule { }
