import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  AlertService
} from '@giftdibs/ux';

import {
  ModalInstance
} from '@giftdibs/ux';

import {
  WishList,
  WishListService
} from '@app/shared/modules/wish-list';

@Component({
  selector: 'gd-wish-list-create',
  templateUrl: './wish-list-create.component.html',
  styleUrls: ['./wish-list-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListCreateComponent implements OnInit, AfterViewInit {
  public wishListForm: FormGroup;
  public errors: any[];
  public isLoading = false;

  @ViewChild('nameInput')
  private nameInput: ElementRef;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modal: ModalInstance<any>,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
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

    this.wishListService.create(formData)
      .subscribe(
        (result: any) => {
          this.modal.close('save');
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

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      name: new FormControl(null, []),
      privacy: new FormControl(null, [])
    });
  }
}
