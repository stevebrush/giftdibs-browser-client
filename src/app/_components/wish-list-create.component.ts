import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AlertService, WishListService } from '../_services';

@Component({
  selector: 'app-wish-list-create-form',
  templateUrl: './wish-list-create.component.html'
})
export class WishListCreateComponent implements OnInit {
  public wishListForm: FormGroup;
  public isLoading = false;
  public errors: any;

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public onError: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onCancel: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('nameInput')
  public nameInput: ElementRef;

  constructor(
    private alertService: AlertService,
    private wishListService: WishListService,
    private formBuilder: FormBuilder) {
      this.createForm();
    }

  public ngOnInit(): void {
    this.nameInput.nativeElement.focus();
  }

  public createWishList(): void {
    this.isLoading = true;
    const formData = this.wishListForm.value;
    this.wishListService
      .create(formData)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.wishListForm.reset();
          this.alertService.success(data.message);
          this.onSuccess.emit();
        },
        (err: any) => {
          this.errors = err;
          this.onError.emit(err);
        }
      );
  }

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      name: ''
    });
  }
}
