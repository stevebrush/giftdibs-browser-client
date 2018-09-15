import {
  Component, ChangeDetectionStrategy, ViewChild, ElementRef
} from '@angular/core';
import { ModalInstance, AlertService, ModalService, ModalClosedEventArgs, ModalSize } from '@app/ui';
import { UrlImagesLoaderContext } from './url-images-loader-context';
import { UrlScraperService } from '@app/shared/modules/url-scraper/url-scraper.service';
import { UrlImagesSelectorComponent } from '@app/shared/modules/url-scraper/url-images-selector.component';
import { UrlImagesSelectorContext } from '@app/shared/modules/url-scraper/url-images-selector-context';
import { UrlScraperResult } from '@app/shared/modules/url-scraper/url-scraper-result';

@Component({
  selector: 'gd-url-images-loader',
  templateUrl: './url-images-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UrlScraperService
  ]
})
export class UrlImagesLoaderComponent {
  @ViewChild('urlInput')
  private urlInput: ElementRef<any>;

  constructor(
    private alertService: AlertService,
    private context: UrlImagesLoaderContext,
    private modal: ModalInstance<any>,
    private modalService: ModalService,
    private urlScraperService: UrlScraperService
  ) {
    console.log('context:', this.context);
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  public onNextClicked(): void {
    const url = this.urlInput.nativeElement.value;

    // TODO: Check if url is actually an image and send it to the upload service.

    this.urlScraperService.getProduct(url)
      .subscribe(
        (result: UrlScraperResult) => {
          if (result.images && result.images.length) {
            this.openUrlImagesSelector(result);
          } else {
            this.alertService.info('No images found.');
          }
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  private openUrlImagesSelector(result: UrlScraperResult): void {
    const context = new UrlImagesSelectorContext();
    context.product = result;

    const instance = this.modalService.open(UrlImagesSelectorComponent, {
      providers: [{
        provide: UrlImagesSelectorContext,
        useValue: context
      }],
      size: ModalSize.Medium
    });

    instance.closed.subscribe((args: ModalClosedEventArgs) => {
      console.log('closed', args);

      // Pass on the saved image.
      if (args.reason === 'save') {
        this.modal.close('save', {
          image: args.data.selectedImage,
          result
        });
      }
    });
  }
}
