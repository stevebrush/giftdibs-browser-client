import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
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
  mergeMap,
  takeUntil
} from 'rxjs/operators';

import {
  AlertService,
  ModalClosedEventArgs,
  ModalService
} from '../../modules';

import {
  SessionService
} from '../../features/account/session';

import {
  GiftDetailComponent,
  GiftDetailContext,
  Gift
} from '../gifts';

import {
  WishList
} from './wish-list';

import {
  WishListService
} from './wish-list.service';

@Component({
  selector: 'gd-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListComponent implements OnInit {
  public isLoading = true;
  public isSessionUser = false;
  public wishList: WishList;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService,
    private router: Router,
    private sessionService: SessionService,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((params: Params) => {
        const giftId = params.giftId;
        if (giftId) {
          this.openGiftDetailModal(giftId);
        }
      });

    this.activatedRoute.params
      .pipe(
        mergeMap((params: Params) => {
          this.isLoading = true;
          this.wishList = undefined;
          this.changeDetector.markForCheck();
          return this.wishListService.getById(params.wishListId);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (wishList: WishList) => {
          this.wishList = wishList;
          this.isSessionUser = this.sessionService.isSessionUser(this.wishList.user._id);
          this.isLoading = false;
          this.changeDetector.markForCheck();
        },
        () => {
          this.alertService.error('User not found.', true);
          this.router.navigate(['/']);
        }
      );
  }

  public openGiftDetailModal(gift: Gift): void {
    const context = new GiftDetailContext(gift);

    const modalInstance = this.modalService.open(GiftDetailComponent, {
      providers: [{
        provide: GiftDetailContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      // Update the gift in the wish list preview.
      // this.wishList.gifts.forEach((g: Gift) => {
      //   if (g._id === args.data.gift._id) {
      //     g = args.data.gift;
      //     this.changeDetector.markForCheck();
      //   }
      // });
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: {}
      });
    });
  }
}
