import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AlertService, WishListService } from '../_services';
import { WishList } from '../_models';

@Component({
  selector: 'app-wish-list-edit-form',
  templateUrl: './wish-list-edit.component.html'
})
export class WishListEditComponent implements OnInit {
  @Input()
  public wishList: WishList;
  public wishListForm: FormGroup;
  public isLoading = false;
  public errors: any;

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private alertService: AlertService,
    private wishListService: WishListService,
    private formBuilder: FormBuilder) {
      this.createForm();
    }

  public ngOnInit(): void {
    this.wishListForm.reset(this.wishList);
  }

  public updateWishList(): void {
    this.isLoading = true;
    const formData = this.wishListForm.value;
    this.wishListService
      .update(formData)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.alertService.success(data.message);
          this.onSuccess.emit();
        },
        (err: any) => {
          this.errors = err.errors;
          // this.alertService.error(err.message);
        }
      );
  }

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      _id: '',
      name: ''
    } as WishList);
  }
}
