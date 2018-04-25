import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import { AlertService } from '../../../modules/alert/alert.service';
import { WishListService } from '../wish-list.service';
import { WishList } from '../wish-list';

@Component({
  selector: 'gd-wish-list-create',
  templateUrl: './wish-list-create.component.html',
  styleUrls: ['./wish-list-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListCreateComponent implements OnInit, AfterViewInit {
  @Output()
  public cancel = new EventEmitter<void>();

  @Output()
  public success = new EventEmitter<WishList>();

  public wishListForm: FormGroup;
  public errors: any[];
  public isLoading = false;

  @ViewChild('nameInput')
  private nameInput: ElementRef;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private wishListService: WishListService
  ) { }

  public ngOnInit() {
    this.createForm();
  }

  public ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }

  public submit() {
    if (this.wishListForm.disabled) {
      return;
    }

    this.wishListForm.disable();
    this.isLoading = true;
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData: WishList = this.wishListForm.value;

    this.wishListService
      .create(formData)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message);
          this.triggerSuccess(result.data.wishList);
        },
        (err: any) => {
          const error = err.error;
          this.alertService.error(error.message);
          this.errors = error.errors;
          this.wishListForm.enable();
          this.isLoading = false;
          this.changeDetector.markForCheck();
        }
      );
  }

  public triggerCancel() {
    this.resetFormState();
    this.cancel.emit();
  }

  private triggerSuccess(wishList: WishList) {
    this.resetFormState();
    this.success.emit(wishList);
  }

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      name: new FormControl(null, [])
    });
  }

  private resetFormState() {
    this.isLoading = false;
    this.errors = [];
    this.wishListForm.reset();
    this.wishListForm.enable();
    this.changeDetector.markForCheck();
  }
}
