import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  AlertService
} from '@giftdibs/ux';

import {
  ModalInstance
} from '@giftdibs/ux';

import {
  WishList,
  WishListService,
  WishListType
} from '../wish-list';

import {
  WishListEditContext
} from './wish-list-edit-context';

@Component({
  selector: 'gd-wish-list-edit',
  templateUrl: './wish-list-edit.component.html',
  styleUrls: ['./wish-list-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListEditComponent implements OnInit {
  public wishListForm: FormGroup;
  public errors: any[];
  public isLoading = false;
  public wishList: WishList;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modal: ModalInstance<any>,
    private context: WishListEditContext,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.wishList = this.context.wishList;

    if (this.wishList) {
      // Set missing defaults.
      if (!this.wishList.type) {
        this.wishList.type = WishListType.WishList;
      }

      this.wishListForm.reset(this.wishList);
    }
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  public submit(): void {
    if (this.wishListForm.disabled) {
      return;
    }

    this.errors = [];
    this.disableView();

    const formData: WishList = this.wishListForm.value;

    let obs: any;
    if (this.wishList) {
      obs = this.wishListService.update(this.wishList.id, formData);
    } else {
      obs = this.wishListService.create(formData);
    }

    obs.subscribe(
      () => {
        this.modal.close('save');
      },
      (err: any) => {
        const error = err.error;
        this.alertService.error(error.message);
        this.errors = error.errors;
        this.enableView();
      }
    );
  }

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required
      ]),
      privacy: new FormControl(null, []),
      type: new FormControl(WishListType.WishList)
    });
  }

  private disableView(): void {
    this.wishListForm.disable();
    this.isLoading = true;
    this.changeDetector.markForCheck();
  }

  private enableView(): void {
    this.isLoading = false;
    this.wishListForm.enable();
    this.changeDetector.markForCheck();
  }
}
