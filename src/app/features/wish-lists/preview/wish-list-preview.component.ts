import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  AlertService,
  ConfirmAnswer,
  ConfirmService,
  DropdownMenuItem,
  ModalClosedEventArgs,
  ModalService,
  WindowRefService
} from '../../../modules';

import {
  SessionService
} from '../../account/session';

import {
  GiftDetailComponent,
  GiftDetailContext,
  GiftEditComponent,
  GiftEditContext
} from '../../gifts';

import {
  Gift,
  GiftService
} from '../../gifts';

import { WishListEditContext } from '../edit/wish-list-edit-context';
import { WishListEditComponent } from '../edit/wish-list-edit.component';

import { WishList } from '../wish-list';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'gd-wish-list-preview',
  templateUrl: './wish-list-preview.component.html',
  styleUrls: ['./wish-list-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListPreviewComponent implements OnInit, OnDestroy {
  @Input()
  public wishList: WishList;

  @Output()
  public removed = new EventEmitter<void>();

  public isSessionUser = false;
  public menuItems: DropdownMenuItem[] = [
    {
      label: 'Edit',
      action: () => {
        this.openWishListEditModal();
      }
    },
    {
      label: 'Delete',
      action: () => {
        this.confirmDelete();
      }
    }
  ];

  @ViewChild('addGiftButton')
  private addGiftButton: ElementRef;

  @ViewChild('dropdownTrigger')
  private dropdownTrigger: ElementRef;

  private ngUnsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private giftService: GiftService,
    private modalService: ModalService,
    private router: Router,
    private sessionService: SessionService,
    private windowRef: WindowRefService,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.isSessionUser = this.sessionService.isSessionUser(this.wishList.user._id);

    // Show gift detail?
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((params: Params) => {
        const giftId = params.giftId;
        if (giftId) {

          // The giftId belongs to another wish list.
          if (!this.wishList.gifts) {
            // this.clearGiftIdFromUrl();
            return;
          }

          const found = this.wishList.gifts.find((gift) => gift._id === giftId);
          if (found) {
            this.windowRef.nativeWindow.setTimeout(() => {
              this.openGiftDetailModal(giftId);
            });
          }
        }
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public openGiftEditModal(gift?: Gift): void {
    const context = new GiftEditContext(gift, this.wishList._id);

    const modalInstance = this.modalService.open(GiftEditComponent, {
      providers: [{
        provide: GiftEditContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.giftService
          .getById(args.data.giftId)
          .subscribe(
            (newGift: Gift) => {
              if (gift) {
                this.wishList.gifts[this.wishList.gifts.indexOf(gift)] = newGift;
                this.changeDetector.markForCheck();
                return;
              }

              if (!this.wishList.gifts) {
                this.wishList.gifts = [];
              }

              this.wishList.gifts.push(newGift);
              this.changeDetector.markForCheck();
            },
            (err: any) => {
              this.alertService.error(err.error.message);
            }
          );
      }

      if (!gift) {
        this.addGiftButton.nativeElement.focus();
      }
    });
  }

  public getGiftDropdownMenuItems(gift: Gift): DropdownMenuItem[] {
    return [
      {
        label: 'Edit',
        action: () => {
          this.openGiftEditModal(gift);
        }
      },
      {
        label: 'Delete',
        action: () => {
          this.giftService.remove(gift._id).subscribe(
            () => {
              const oldGift = this.wishList.gifts.find((g) => g._id === gift._id);
              this.wishList.gifts.splice(this.wishList.gifts.indexOf(oldGift), 1);
              this.changeDetector.markForCheck();
            },
            (err: any) => {
              this.alertService.error(err.error.message);
            }
          );
        }
      }
    ];
  }

  public openGiftDetailModal(giftId: string): void {
    const context = new GiftDetailContext(giftId);

    const modalInstance = this.modalService.open(GiftDetailComponent, {
      providers: [{
        provide: GiftDetailContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      // Update the gift in the wish list preview.
      const updatedGift = args.data.gift;
      this.wishList.gifts.forEach((gift: Gift, j: number) => {
        if (gift._id === updatedGift._id) {
          this.wishList.gifts[j] = updatedGift;
        }
      });

      this.changeDetector.markForCheck();

      this.clearGiftIdFromUrl();
    });
  }

  private openWishListEditModal(): void {
    const context = new WishListEditContext();
    context.wishList = this.wishList;

    const modalInstance = this.modalService.open(WishListEditComponent, {
      providers: [{
        provide: WishListEditContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.wishListService
          .getById(this.wishList._id)
          .subscribe((wishList: WishList) => {
            this.wishList = wishList;
            this.changeDetector.markForCheck();
          });
      }

      this.dropdownTrigger.nativeElement.focus();
    });
  }

  private confirmDelete(): void {
    this.confirmService.confirm({
      message: 'Are you sure?'
    }, (answer: ConfirmAnswer) => {
      if (answer.type === 'okay') {
        this.wishListService
          .remove(this.wishList._id)
          .subscribe(
            (data: any) => {
              this.removed.emit();
              this.removed.complete();
            },
            (err: any) => {
              this.alertService.error(err.error.message);
            }
          );
      }
    });
  }

  private clearGiftIdFromUrl(): void {
    // Remove giftId from URL.
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {}
    });
  }
}
