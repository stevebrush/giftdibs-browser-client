import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
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
} from '../../../modules/alert';

import { WishList } from '../wish-list';
import { WishListService } from '../wish-list.service';
import { WishListEditContext } from './wish-list-edit-context';
import { OverlayInstance } from '../../../modules/overlay';

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

  public succeeded = new EventEmitter<string>();

  private wishList: WishList;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private context: WishListEditContext,
    private formBuilder: FormBuilder,
    private instance: OverlayInstance<WishListEditComponent>,
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
          this.succeeded.emit(this.wishList._id);
          this.succeeded.complete();
          this.instance.destroy();
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

  public onCancelClicked(): void {
    this.instance.destroy();
  }

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required
      ]),
      privacy: new FormControl(null, [])
    });
  }
}
