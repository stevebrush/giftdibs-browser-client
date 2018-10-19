import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  AlertService,
  ModalClosedEventArgs,
  ModalInstance,
  ModalService,
  ModalSize
} from '@app/ui';

import {
  finalize
} from 'rxjs/operators';

import { UrlImagesSelectorContext } from './url-images-selector-context';
import { UrlImagesSelectorComponent } from './url-images-selector.component';

import { UrlScraperResult } from './url-scraper-result';
import { UrlScraperService } from './url-scraper.service';

@Component({
  selector: 'gd-url-images-loader',
  templateUrl: './url-images-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UrlScraperService
  ]
})
export class UrlImagesLoaderComponent {
  public disabled = false;

  @ViewChild('urlInput')
  private urlInput: ElementRef<any>;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private modal: ModalInstance<any>,
    private modalService: ModalService,
    private urlScraperService: UrlScraperService
  ) { }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  public onNextClicked(): void {
    this.disabled = true;
    this.changeDetector.markForCheck();

    const url = this.urlInput.nativeElement.value;

    // TODO: Check if url is actually an image and send it to the upload service.

    this.urlScraperService.getProduct(url)
      .pipe(
        finalize(() => {
          this.disabled = false;
          this.changeDetector.markForCheck();
        })
      )
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
