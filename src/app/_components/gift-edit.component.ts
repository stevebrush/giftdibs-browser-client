import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { AlertService, WishListService } from '../_services';
import { Gift } from '../_models';

@Component({
  selector: 'app-gift-edit-form',
  templateUrl: './gift-edit.component.html'
})
export class GiftEditComponent implements OnInit {
  @Input()
  public giftId: string;

  @Input()
  public wishListId: string;

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onCancel: EventEmitter<void> = new EventEmitter<void>();

  public gift: Gift;
  public giftForm: FormGroup;
  public isLoading = false;
  public errors: any;

  constructor(
    private alertService: AlertService,
    private wishListService: WishListService,
    private formBuilder: FormBuilder) {
      this.createForm();
    }

  public ngOnInit(): void {
    this.isLoading = true;
    this.wishListService
      .getById(this.wishListId)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe((data: any) => {
        this.gift = data.wishList.gifts.filter((gift: Gift) => gift._id === this.giftId)[0];
        this.giftForm.reset(this.gift);
        this.giftForm.controls.externalUrls = this.formBuilder.array([]);
        this.gift.externalUrls.forEach((externalUrl: any) => {
          const control = <FormArray>this.giftForm.controls.externalUrls;
          control.push(this.formBuilder.group(externalUrl));
        });
      });
  }

  public updateGift(): void {
    this.isLoading = true;

    const formData = this.giftForm.value;

    // Need to manually retrieve the form data of the nested forms:
    const externalUrls = this.giftForm.controls.externalUrls;
    formData.externalUrls = externalUrls.value;

    this.wishListService
      .updateGift(this.wishListId, formData)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.alertService.success(data.message);
          this.onSuccess.emit();
        },
        (err: any) => {
          this.errors = err.errors;
          this.alertService.error(err.message);
        }
      );
  }

  public addExternalUrlField(): void {
    const externalUrls = <FormArray>this.giftForm.controls.externalUrls;
    externalUrls.push(this.createExternalUrlForm());
  }

  public removeUrl(index: number) {
    const externalUrls = <FormArray>this.giftForm.controls.externalUrls
    externalUrls.removeAt(index);
  }

  private createForm(): void {
    this.giftForm = this.formBuilder.group({
      _id: '',
      name: '',
      budget: undefined,
      externalUrls: this.formBuilder.array([])
    });
  }

  private createExternalUrlForm(): FormGroup {
    return this.formBuilder.group({
      url: undefined
    });
  }
}
