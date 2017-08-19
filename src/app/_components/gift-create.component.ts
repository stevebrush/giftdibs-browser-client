import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  AlertService,
  WishListService,
  ScraperService
} from '../_services';

import { Gift } from '../_models';

@Component({
  selector: 'app-gift-create-form',
  templateUrl: './gift-create.component.html'
})
export class GiftCreateComponent implements OnInit {
  public giftForm: FormGroup;
  public isLoading = false;
  public errors: any;

  @Input()
  public wishListId: string;

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public onError: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('nameInput')
  public nameInput: ElementRef;

  constructor(
    private alertService: AlertService,
    private wishListService: WishListService,
    private scraperService: ScraperService,
    private formBuilder: FormBuilder) {
      this.createForm();
    }

  public ngOnInit(): void {
    this.nameInput.nativeElement.focus();
  }

  public onKeyUp(event: KeyboardEvent): void {
    if (event.which === 13 && !this.isLoading) {
      this.createGift();
      event.preventDefault();
    }
  }

  public createGift(): void {
    this.isLoading = true;

    const formData = this.giftForm.value;
    const isUrl = (/^https?:\/\//.test(formData.name));

    if (isUrl) {
      this.scraperService
        .getGiftDetailsFromUrl(formData.name)
        .first()
        .subscribe(
          (data: any) => {
            this.addGift({
              externalUrl: data.product.url,
              name: data.product.name,
              budget: data.product.price
            });
            // this.giftForm.reset({
            //   externalUrl: data.product.url,
            //   name: data.product.name,
            //   budget: data.product.price
            // });
            // console.log('data?', data);
          },
          (err: any) => {
            console.log('err?', err);
          }
        );
    } else {
      this.addGift(formData);
    }
  }

  private addGift(formData: Gift): void {
    this.wishListService
      .addGift(this.wishListId, formData)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.giftForm.reset();
          this.onSuccess.emit();
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.errors = err.errors;
          this.onError.emit(err);
          this.alertService.error(err.message);
        }
      );
  }

  private createForm(): void {
    this.giftForm = this.formBuilder.group({
      name: '',
      externalUrl: '',
      budget: undefined
    } as Gift);
  }
}
