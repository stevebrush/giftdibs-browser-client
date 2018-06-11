// #region imports
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  Observable
} from 'rxjs';

import {
  AlertService,
  ModalInstance
} from '../../modules';

import {
  SessionService
} from '../account/session';

import {
  WishList
} from '../wish-lists/wish-list';

import {
  WishListService
} from '../wish-lists/wish-list.service';

import {
  Gift
} from './gift';

import {
  GiftMoveContext
} from './gift-move-context';

import {
  GiftService
} from './gift.service';
// #endregion

@Component({
  selector: 'gd-gift-edit',
  templateUrl: './gift-move.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftMoveComponent implements OnInit {
  public errors: any[];
  public gift: Gift;
  public moveForm: FormGroup;
  public isLoading = false;

  public wishLists: Observable<WishList[]>;

  private wishList: WishList;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private context: GiftMoveContext,
    private giftService: GiftService,
    private modal: ModalInstance<any>,
    private sessionService: SessionService,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.gift = this.context.gift;
    this.wishList = this.context.wishList;
    this.moveForm.reset({
      wishListId: this.wishList.id
    });
    this.wishLists = this.wishListService.getAllByUserId(this.sessionService.user.id);
  }

  public submit(): void {
    if (this.moveForm.disabled) {
      return;
    }

    this.moveForm.disable();
    this.isLoading = true;
    this.errors = [];
    this.changeDetector.markForCheck();

    const wishListId = this.moveForm.value.wishListId;

    this.giftService.update(this.gift.id, { wishListId })
      .subscribe(
        (result: any) => {
          this.modal.close('save', result.data);
        },
        (err) => {
          const error = err.error;
          this.alertService.error(error.message);
          this.errors = error.errors;
          this.moveForm.enable();
          this.isLoading = false;
          this.changeDetector.markForCheck();
        }
      );
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  private createForm(): void {
    this.moveForm = this.formBuilder.group({
      wishListId: undefined
    });
  }
}
