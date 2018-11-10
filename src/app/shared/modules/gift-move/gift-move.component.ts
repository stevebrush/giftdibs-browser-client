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
  public modalTitle: string;
  public wishLists: WishList[];

  public get wishListId(): string {
    return this.moveForm.get('wishListId').value;
  }

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
    this.modalTitle = this.context.title;

    this.moveForm.reset({
      wishListId: this.context.wishListId
    });

    this.wishListService.getAllByUserId(this.sessionService.user.id)
      .subscribe((wishLists) => {
        this.wishLists = wishLists;

        if (!this.context.wishListId && wishLists.length) {
          this.moveForm.get('wishListId').setValue(wishLists[0].id);
        }

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

    // Create a new wish list.
    if (this.wishListId === 'new') {
      this.wishListService.create({
        name: this.moveForm.get('name').value
      }).subscribe(
        (result: any) => {
          this.moveForm.get('wishListId').setValue(result.data.wishListId);
          this.moveGiftToWishList();
        },
        (err: any) => {
          this.handleError(err);
        }
      );
    } else {
      this.moveGiftToWishList();
    }
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  private createForm(): void {
    this.moveForm = this.formBuilder.group({
      name: undefined,
      wishListId: undefined
    });
  }

  private moveGiftToWishList(): void {
    // Update existing gift.
    if (this.gift.id) {
      const formData = {
        wishList: { id: this.wishListId }
      };

      this.giftService.update(this.gift.id, formData)
        .subscribe(
          (result: any) => {
            this.modal.close('save', result.data);
          },
          (err) => {
            this.handleError(err);
          }
        );

    // Create a new gift.
    } else {
      this.giftService.create(this.wishListId, this.gift)
        .subscribe(
          (result: any) => {
            this.modal.close('save', result.data);
          },
          (err) => {
            this.handleError(err);
          }
        );
    }


  }

  private handleError(err: any): void {
    const error = err.error;
    this.alertService.error(error.message);
    this.errors = error.errors;
    this.moveForm.enable();
    this.isLoading = false;
    this.changeDetector.markForCheck();
  }
}
