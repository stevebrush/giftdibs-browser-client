import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  AlertService
} from '../../../modules';

import { WishList } from '../wish-list';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'gd-wish-list-create',
  templateUrl: './wish-list-create.component.html',
  styleUrls: ['./wish-list-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListCreateComponent implements OnInit, AfterViewInit {
  @Output()
  public cancelled = new EventEmitter<void>();

  @Output()
  public saved = new EventEmitter<WishList>();

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

  public ngOnInit(): void {
    this.createForm();
  }

  public ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  public submit(): void {
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
          this.resetFormState();
          this.saved.emit(result.data.wishListId);
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

  public triggerCancel(): void {
    this.resetFormState();
    this.cancelled.emit();
  }

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      name: new FormControl(null, []),
      privacy: new FormControl(null, [])
    });
  }

  private resetFormState(): void {
    this.isLoading = false;
    this.errors = [];
    this.wishListForm.reset();
    this.wishListForm.enable();
    this.changeDetector.markForCheck();
  }
}
