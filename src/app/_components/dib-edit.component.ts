import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  DibService
} from '../_services';

import {
  Dib
} from '../_models';

@Component({
  selector: 'app-dib-edit',
  templateUrl: './dib-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DibEditComponent implements OnInit {
  @Input()
  public dib: Dib;

  @Output()
  public onSuccess: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onError: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onCancel: EventEmitter<void> = new EventEmitter<void>();

  public formModel: FormGroup;
  public isLoading = false;
  public errors: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dibService: DibService,
    private formBuilder: FormBuilder) {
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
      .finally(() => {
        this.isLoading = false;
        this.changeDetector.detectChanges();
      })
      .subscribe(
        (data: any) => {
          this.onSuccess.emit(data);
        },
        (err: any) => {
          this.errors = err.errors;
          this.onError.emit(err);
        }
      );
  }

  private createForm(): void {
    this.formModel = this.formBuilder.group({
      _gift: undefined,
      _id: '',
      isDelivered: false,
      pricePaid: undefined,
      quantity: undefined
    });
  }
}
