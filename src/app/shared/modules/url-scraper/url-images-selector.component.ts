import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  ModalInstance
} from '@app/ui';

import { UrlImagesSelectorContext } from './url-images-selector-context';
import { UrlScraperResultImage } from './url-scraper-result-image';

@Component({
  selector: 'gd-url-images-selector',
  templateUrl: './url-images-selector.component.html',
  styleUrls: ['./url-images-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrlImagesSelectorComponent implements OnInit {
  public images: UrlScraperResultImage[] = [];
  public selectedImage: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private context: UrlImagesSelectorContext,
    private modal: ModalInstance<any>
  ) { }

  public ngOnInit(): void {
    const product = this.context.product;

    if (!Array.isArray(product.images) || !product.images.length) {
      return;
    }

    this.images = product.images;
    this.selectedImage = this.images[0];
    this.changeDetector.markForCheck();
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  public onSelectClicked(): void {
    // Load the images
    // Launch a new modal with the image results to let the user select.
    this.modal.close('save', {
      selectedImage: this.selectedImage
    });
  }

  public selectImage(image: any): void {
    this.selectedImage = image;
    this.changeDetector.markForCheck();
  }

  public isSelectedImage(image: any): boolean {
    return (image === this.selectedImage);
  }
}
