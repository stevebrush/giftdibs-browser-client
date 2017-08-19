import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AlertService, WishListService } from '../_services';
import { Gift } from '../_models';

@Component({
  selector: 'app-gift-edit-form',
  templateUrl: './gift-edit.component.html'
})
export class GiftEditComponent implements OnInit {
  @Input()
  public gift: Gift;
  @Input()
  public wishListId: string;

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public onCancel: EventEmitter<void> = new EventEmitter<void>();

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
    this.giftForm.reset(this.gift);
  }

  public updateGift(): void {
    this.wishListService
      .updateGift(this.wishListId, this.giftForm.value)
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

  private createForm(): void {
    this.giftForm = this.formBuilder.group({
      _id: '',
      name: '',
      externalUrl: undefined,
      budget: undefined
    } as Gift);
  }
}
