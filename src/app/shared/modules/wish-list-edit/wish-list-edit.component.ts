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
  Router
} from '@angular/router';

import {
  AlertService,
  ConfirmAnswer,
  ConfirmService,
  ModalInstance
} from '@app/ui';

import {
  WishList,
  WishListService
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

  private wishList: WishList;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private formBuilder: FormBuilder,
    private modal: ModalInstance<any>,
    private context: WishListEditContext,
    private router: Router,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.wishList = this.context.wishList;
    this.wishListForm.reset(this.wishList);
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
    this.wishListService
      .update(this.wishList.id, formData)
      .subscribe(
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

  public delete(): void {
    this.confirmDelete();
  }

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required
      ]),
      privacy: new FormControl(null, [])
    });
  }

  private confirmDelete(): void {
    this.errors = [];
    this.disableView();

    this.confirmService.confirm({
      message: 'Are you sure?'
    }, (answer: ConfirmAnswer) => {
      if (answer.type === 'okay') {
        this.wishListService.remove(this.wishList.id)
          .subscribe(
            () => {
              this.alertService.success('Wish list successfully deleted.', true);
              this.router.navigate(['/']);
            },
            (err: any) => {
              this.alertService.error(err.error.message);
              this.enableView();
            }
          );
      } else {
        this.enableView();
      }
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
