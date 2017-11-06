import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';

import {
  GiftService
} from '../_services';

import {
  Gift
} from '../_models';

@Component({
  selector: 'app-gift-edit-form',
  templateUrl: './gift-edit.component.html'
})
export class GiftEditComponent implements OnInit {
  @Input()
  public gift: Gift;

  @Output()
  public onSuccess: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onCancel: EventEmitter<void> = new EventEmitter<void>();

  public giftForm: FormGroup;
  public isLoading = false;
  public errors: any;

  constructor(
    private giftService: GiftService,
    private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.createForm();
    this.giftForm.reset(this.gift);
    this.giftForm.controls.externalUrls = this.formBuilder.array([]);

    this.gift.externalUrls.forEach((externalUrl: any) => {
      const control = <FormArray>this.giftForm.controls.externalUrls;
      control.push(this.formBuilder.group(externalUrl));
    });
  }

  public updateGift(): void {
    this.isLoading = true;

    const formData = this.giftForm.value;

    // Need to manually retrieve the form data of the nested forms:
    const externalUrls = this.giftForm.controls.externalUrls;
    formData.externalUrls = externalUrls.value;

    this.giftService
      .update(formData)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => this.onSuccess.emit({
          gift: formData,
          message: data.message
        }),
        (err: any) => this.errors = err.error.errors
      );
  }

  public addExternalUrlField(): void {
    const externalUrls = <FormArray>this.giftForm.controls.externalUrls;
    externalUrls.push(this.createExternalUrlForm());
  }

  public removeUrl(index: number) {
    const externalUrls = <FormArray>this.giftForm.controls.externalUrls;
    externalUrls.removeAt(index);
  }

  private createForm(): void {
    this.giftForm = this.formBuilder.group({
      _id: '',
      _user: undefined,
      _wishList: undefined,
      budget: undefined,
      externalUrls: this.formBuilder.array([]) as any,
      name: '',
      orderInWishList: undefined,
      priority: undefined,
      quantity: undefined
    } as Gift);
  }

  private createExternalUrlForm(): FormGroup {
    return this.formBuilder.group({
      url: undefined
    });
  }
}
