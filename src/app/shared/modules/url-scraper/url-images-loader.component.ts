import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  AlertService
} from '@giftdibs/ux';

import {
  ModalClosedEventArgs,
  ModalInstance,
  ModalService,
  ModalSize
} from '@giftdibs/ux';

import {
  Subject
} from 'rxjs';

import {
  finalize,
  takeUntil
} from 'rxjs/operators';

import { UrlImagesLoaderContext } from './url-images-loader-context';
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
export class UrlImagesLoaderComponent implements OnInit {
  public disabled = false;

  public url: string;
  public allowUrlEdit = true;

  @ViewChild('urlInput', { static: false })
  private urlInput: ElementRef<any>;

  private cancelled = new Subject<void>();

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private modal: ModalInstance<any>,
    private modalService: ModalService,
    private urlScraperService: UrlScraperService,
    private context: UrlImagesLoaderContext
  ) { }

  public ngOnInit(): void {
    if (this.context.allowUrlEdit === false) {
      this.allowUrlEdit = false;
    }

    this.url = this.context.url;

    if (this.url && this.allowUrlEdit) {
      setTimeout(() => {
        this.urlInput.nativeElement.value = this.context.url;
      });
    }

    if (this.url) {
      this.onNextClicked();
    }
  }

  public onInputChange(event: any): void {
    this.url = event.target.value;
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
    this.cancelled.next();
    this.cancelled.complete();
  }

  public onNextClicked(): void {
    this.disabled = true;
    this.changeDetector.markForCheck();

    // TODO: Check if url is actually an image and send it to the upload service.

    this.urlScraperService.getProduct(this.url)
      .pipe(
        takeUntil(this.cancelled),
        finalize(() => {
          this.disabled = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        (result: UrlScraperResult) => {
          if (result.images && result.images.length) {
            // Automatically select the first image if there's only one.
            if (result.images.length === 1) {
              this.modal.close('save', {
                image: result.images[0],
                result
              });
              return;
            }
            this.openUrlImagesSelector(result);
          } else {
            if (this.allowUrlEdit) {
              this.alertService.info('No images found.');
            } else {
              this.modal.close('save', {
                result
              });
            }
          }
        },
        (err: any) => {
          const message = err.error.message ||
            `We couldn't reach that URL. Please try again later.`;
          this.alertService.error(message);
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
      } else {
        if (!this.allowUrlEdit) {
          this.modal.close('cancel');
        }
      }
    });
  }
}
