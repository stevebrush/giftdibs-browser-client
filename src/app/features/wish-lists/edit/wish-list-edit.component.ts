import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  AlertService
} from '../../../modules/alert';

import { WishList } from '../wish-list';
import { WishListService } from '../wish-list.service';
import { WishListEditContext } from './wish-list-edit-context';

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
    private formBuilder: FormBuilder,
    private context: WishListEditContext,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.wishList = this.context.wishList;
    this.wishListForm.reset(this.wishList);
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
      .update(this.wishList._id, formData)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message);
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
      name: new FormControl(null, [])
    });
  }
}
