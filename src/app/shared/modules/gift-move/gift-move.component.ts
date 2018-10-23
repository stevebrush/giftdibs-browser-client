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
  AlertService
} from '@giftdibs/ux';

import {
  ModalInstance
} from '@giftdibs/ux';

import {
  SessionService
} from '@giftdibs/session';

import {
  WishList,
  WishListService
} from '../wish-list';

import {
  Gift,
  GiftService
} from '../gift';

import {
  GiftMoveContext
} from './gift-move-context';
// #endregion

@Component({
  selector: 'gd-gift-edit',
  templateUrl: './gift-move.component.html',
  styleUrls: ['./gift-move.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftMoveComponent implements OnInit {
  public errors: any[];
  public gift: Gift;
  public moveForm: FormGroup;
  public isLoading = true;
  public wishLists: WishList[];

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

    this.moveForm.reset({
      wishListId: this.context.wishListId
    });

    this.wishListService.getAllByUserId(this.sessionService.user.id)
      .subscribe((wishLists) => {
        this.wishLists = wishLists;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
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
    const formData = {
      wishList: { id: wishListId }
    };

    this.giftService.update(this.gift.id, formData)
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
