import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  AlertService,
  DibService
} from '../_services';

import {
  Dib
} from '../_models';

@Component({
  selector: 'app-dib-edit',
  templateUrl: './dib-edit.component.html'
})
export class DibEditComponent implements OnInit {
  @Input()
  public dib: Dib;

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();

  public formModel: FormGroup;
  public isLoading = false;
  public errors: any;

  constructor(
    private alertService: AlertService,
    private dibService: DibService,
    private formBuilder: FormBuilder) {
      this.isLoading = true;
      this.createForm();
    }

  public ngOnInit(): void {
    this.formModel.reset(this.dib);
    this.isLoading = false;
  }

  public onSubmit(): void {
    this.isLoading = true;
    const formData = this.formModel.value;
    this.dibService
      .update(formData)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => this.onSuccess.emit(),
        (err: any) => {
          this.errors = err.errors;
          this.alertService.error(err.message);
        }
      );
  }

  private createForm(): void {
    this.formModel = this.formBuilder.group({
      _id: '',
      isDelivered: false,
      pricePaid: undefined
    });
  }

  // private refreshDib(): void {
  //   this.isLoading = true;
  //   this.dibService
  //     .getById(this.dib._id)
  //     .first()
  //     .finally(() => this.isLoading = false)
  //     .subscribe((data: any) => {
  //       this.dib = dib;
  //     });
  // }
}
