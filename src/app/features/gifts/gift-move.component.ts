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
  // zip
} from 'rxjs';

// import {
//   take, mergeMap
// } from 'rxjs/operators';

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

import { GiftService } from './gift.service';
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
      wishListId: this.wishList._id
    });
    this.wishLists = this.wishListService.getAllByUserId(this.sessionService.user._id);
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

    this.giftService.update(this.gift._id, { wishListId })
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

    // const selectedWishListId = this.moveForm.value.wishListId;

    // if (selectedWishListId === this.wishList._id) {
    //   console.log('Same!');
    //   this.onCancelClicked();
    //   return;
    // }

    // this.wishLists.pipe(
    //   take(1),
    //   mergeMap((wishLists) => {
    //     const selectedWishList = wishLists.find(w => w._id === selectedWishListId);

    //     return zip(
    //       this.wishListService.update(selectedWishListId, selectedWishList),
    //       this.wishListService.update(this.wishList._id, this.wishList)
    //     );
    //   })
    // ).subscribe(
    //   (result: any) => {
    //     console.log('result?', result);
    //   },
    //   (err: any) => {
    //     const error = err.error;
    //     this.alertService.error(error.message);
    //     this.errors = error.errors;
    //     this.moveForm.enable();
    //     this.isLoading = false;
    //     this.changeDetector.markForCheck();
    //   }
    // );

    // console.log('wishLists:', this.wishList._id, selectedWishListId);

    // let obs: any;
    // if (this.gift) {
    //   obs = this.giftService.update(this.gift._id, formData);
    // } else {
    //   obs = this.giftService.create(this.wishListId, formData);
    // }

    // obs.subscribe(
    //   (result: any) => {
    //     const giftId = (this.gift) ? this.gift._id : result.data.giftId;
    //     this.giftService.getById(giftId).subscribe((gift: Gift) => {
    //       this.modal.close('save', { gift });
    //     });
    //   },
    //   (err: any) => {
    //     const error = err.error;
    //     this.alertService.error(error.message);
    //     this.errors = error.errors;
    //     this.moveForm.enable();
    //     this.isLoading = false;
    //     this.changeDetector.markForCheck();
    //   }
    // );
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
