import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AlertService,
  ModalClosedEventArgs,
  ModalInstance,
  ModalService,
  ModalSize
} from '@app/ui';

import {
  Observable
} from 'rxjs';

import {
  finalize
} from 'rxjs/operators';

import {
  AssetsService
} from '../assets';

import {
  Gift,
  GiftService
} from '../gift';

import {
  GiftEditContext
} from './gift-edit-context';

import {
  UrlScraperService,
  UrlScraperResult,
  UrlImagesLoaderComponent,
  UrlImagesLoaderContext
} from '@app/shared/modules/url-scraper';

@Component({
  selector: 'gd-gift-edit',
  templateUrl: './gift-edit.component.html',
  styleUrls: ['./gift-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UrlScraperService
  ]
})
export class GiftEditComponent implements OnInit {
  public get externalUrls(): FormArray {
    return <FormArray>this.giftForm.get('externalUrls');
  }

  public errors: any[];
  public gift: Gift;
  public giftForm: FormGroup;

  private newImageFile: any;
  private wishListId: string;

  constructor(
    private alertService: AlertService,
    private assetsService: AssetsService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private context: GiftEditContext,
    private giftService: GiftService,
    private modal: ModalInstance<any>,
    private modalService: ModalService,
    private router: Router,
    private urlScraperService: UrlScraperService
  ) { }

  public ngOnInit(): void {
    this.createForm();

    this.gift = this.context.gift;
    this.wishListId = this.context.wishListId;

    if (this.gift) {
      this.resetForm(this.gift);
    }
  }

  public onSelectFile(args: any): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.giftForm.get('imageUrl').setValue(e.target.result);
    };

    reader.readAsDataURL(args.file);

    this.newImageFile = args.file;
  }

  public onRemoveFile(): void {
    this.giftForm.disable();
    this.changeDetector.markForCheck();

    this.assetsService.removeGiftThumbnail(this.gift.id)
      .pipe(
        finalize(() => {
          this.giftForm.enable();
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        () => {
          this.giftForm.get('imageUrl').reset();
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  public onUrlButtonClick(): void {
    this.openUrlImagesLoaderModal();
  }

  public submit(): void {
    if (this.giftForm.disabled) {
      return;
    }

    this.giftForm.disable();
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData: Gift = this.giftForm.value;

    // Need to manually retrieve the form data of the nested forms:
    formData.externalUrls = this.externalUrls.value;
    console.log('submit with:', formData);

    let obs: any;
    if (this.gift) {
      obs = this.giftService.update(this.gift.id, formData);
    } else {
      obs = this.giftService.create(this.wishListId, formData);
    }

    obs.subscribe(
      (result: any) => {
        const giftId = (this.gift) ? this.gift.id : result.data.giftId;

        if (this.newImageFile) {
          this.uploadImage(this.newImageFile, giftId).subscribe(
            () => {
              this.modal.close('save');
            },
            (err: any) => {
              this.giftService.getById(giftId).subscribe((gift: Gift) => {
                this.gift = gift;
                this.resetForm(this.gift);
                this.giftForm.enable();
                this.changeDetector.markForCheck();
                this.alertService.error(err.error.message);
              });
            }
          );
          return;
        }

        this.modal.close('save');
      },
      (err: any) => {
        const error = err.error;
        this.alertService.error(error.message);
        this.errors = error.errors;
        this.giftForm.enable();
        this.changeDetector.markForCheck();
      }
    );
  }

  public deleteGift(): void {
    if (this.giftForm.disabled) {
      return;
    }

    this.giftForm.disable();
    this.errors = [];
    this.changeDetector.markForCheck();
    this.giftService.remove(this.gift.id).subscribe(
      () => {
        this.modal.close('save');
        this.alertService.success('Gift successfully deleted.', true);
        this.router.navigate(['/users', this.gift.user.id]);
      },
      (err: any) => {
        const error = err.error;
        this.alertService.error(error.message);
        this.errors = error.errors;
        this.giftForm.enable();
        this.changeDetector.markForCheck();
      }
    );
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  public addExternalUrlField(): void {
    const externalUrls = <FormArray>this.giftForm.controls.externalUrls;
    externalUrls.push(this.createExternalUrlForm());
  }

  public refreshUrlDetails(): void {
    this.giftForm.disable();
    this.changeDetector.markForCheck();

    const externalUrls: FormArray = <FormArray>this.giftForm.get('externalUrls');
    // const urls = externalUrls.value.map((externalUrl: any) => externalUrl.url);

    // this.urlScraperService.getProducts(urls)
    //   .subscribe((products: UrlScraperResult[]) => {
    //     products.forEach((product) => {
    //       const formControl = externalUrls.controls.find((control) => {
    //         return control.value.url === product.url;
    //       });
    //       formControl.get('price').setValue(product.price);
    //       formControl.get('imageUrl').setValue(product.imageUrl);
    //     });
    //   });

    let numComplete = 0;
    externalUrls.controls.forEach((control) => {
      this.urlScraperService.getProduct(control.value.url)
        .subscribe(
          (result: UrlScraperResult) => {
            if (result.price) {
              control.get('price').setValue(result.price);
            }
            numComplete++;

            if (numComplete === externalUrls.length) {
              this.giftForm.enable();
              this.changeDetector.markForCheck();
            }
          },
          (err: any) => {
            this.giftForm.enable();
            this.changeDetector.markForCheck();
            this.alertService.error(err.error.message);
          }
        );
    });
  }

  public removeUrl(index: number): void {
    this.externalUrls.removeAt(index);
  }

  private createForm(): void {
    this.giftForm = this.formBuilder.group({
      budget: undefined,
      externalUrls: this.formBuilder.array([]) as any,
      imageUrl: new FormControl(),
      name: new FormControl(null, [
        Validators.required
      ]),
      notes: undefined,
      priority: 3,
      quantity: 1
    });
  }

  private createExternalUrlForm(
    values?: { price: number, url: string }
  ): FormGroup {
    return this.formBuilder.group(Object.assign({
      price: undefined,
      url: undefined
    }, values));
  }

  private uploadImage(file: any, giftId: string): Observable<any> {
    this.giftForm.disable();
    this.changeDetector.markForCheck();

    return this.assetsService.uploadGiftThumbnail(file, giftId);
  }

  private resetForm(gift: Gift): void {
    this.giftForm.reset(gift);

    this.giftForm.setControl(
      'externalUrls',
      this.formBuilder.array([])
    );

    const control = this.externalUrls;
    gift.externalUrls.forEach((externalUrl: any) => {
      control.push(
        this.formBuilder.group(
          Object.assign({
            url: undefined,
            price: undefined
          }, externalUrl)
        )
      );
    });
  }

  private openUrlImagesLoaderModal(): void {
    const context = new UrlImagesLoaderContext();

    const modalInstance = this.modalService.open(UrlImagesLoaderComponent, {
      providers: [{
        provide: GiftEditContext,
        useValue: context
      }],
      size: ModalSize.Small
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      console.log('closed!', args);

      if (args.reason === 'save') {
        // https://stackoverflow.com/a/38936042/6178885
        const dataURLtoFile = (dataUrl: string, filename: string) => {
          const arr = dataUrl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);

          let n = bstr.length;
          const u8arr = new Uint8Array(n);

          while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
          }

          return new File([u8arr], filename, { type: mime });
        };

        this.giftForm.get('imageUrl').setValue(args.data.image.data);
        this.newImageFile = dataURLtoFile(args.data.image.data, 'temp.jpg');

        // Automatically add a new external URL.
        // TODO: This isn't working!
        const externalUrls = <FormArray>this.giftForm.controls.externalUrls;
        externalUrls.push(this.createExternalUrlForm({
          price: args.data.result.price || undefined,
          url: args.data.result.url
        }));

        // Automatically set the name.
        if (args.data.result.name && !this.giftForm.get('name').value) {
          this.giftForm.get('name').setValue(args.data.result.name);
        }

        // Automatically set price.
        if (args.data.result.price && !this.giftForm.get('budget').value) {
          this.giftForm.get('budget').setValue(args.data.result.price);
        }

        this.changeDetector.markForCheck();
      }
    });
  }
}
