import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GiftService, Gift } from '@app/shared/modules/gift';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SessionService } from '@app/shared/modules/session';
import { AlertService, ModalService, ModalClosedEventArgs, ConfirmService, ConfirmAnswer, ModalSize } from '@app/ui';
import { GiftEditContext, GiftEditComponent } from '@app/shared/modules/gift-edit';

@Component({
  selector: 'gd-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss']
})
export class GiftComponent implements OnInit, OnDestroy {
  public gift: Gift;
  public isLoading = true;
  public isSessionUser = false;
  public quantityRemaining: number;

  private ngUnsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private giftService: GiftService,
    private modalService: ModalService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        mergeMap((params: Params) => {
          this.isLoading = true;
          this.gift = undefined;
          this.isSessionUser = false;
          this.changeDetector.markForCheck();
          return this.giftService.getById(params.giftId);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (gift: Gift) => {
          this.gift = gift;
          this.isSessionUser = this.sessionService.isSessionUser(this.gift.user.id);
          this.checkQuantity();
          this.isLoading = false;
          this.changeDetector.markForCheck();
        },
        () => {
          this.alertService.error('Gift not found.', true);
          this.router.navigate(['/']);
        }
      );
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public openGiftEditModal(): void {
    const context = new GiftEditContext(this.gift, this.gift.wishListId);

    const modalInstance = this.modalService.open(GiftEditComponent, {
      providers: [{
        provide: GiftEditContext,
        useValue: context
      }],
      size: ModalSize.Large
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.refreshGift();
      }
    });
  }

  public markReceived(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.confirmService.confirm({
      message: 'Are you sure? This action cannot be undone.'
    }, (answer: ConfirmAnswer) => {
      if (answer.type === 'okay') {
        this.giftService.markAsReceived(this.gift.id)
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.changeDetector.markForCheck();
            })
          )
          .subscribe(
            (result: any) => {
              this.refreshGift();
              this.alertService.success(result.message);
            },
            (err: any) => {
              this.alertService.error(err.error.message);
            }
          );
      } else {
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  public onCommentSaved(): void {
    this.refreshGift();
  }

  public onDibChange(): void {
    this.refreshGift();
  }

  public getURLName(url: string): string {
    if (!url) {
      return '';
    }

    let formatted = url;
    let fragments = formatted.split('//');

    if (fragments.length > 1) {
      formatted = fragments[1];
    }

    fragments = formatted.split('www.');
    if (fragments.length > 1) {
      formatted = fragments[1];
    }

    return formatted.split('/')[0];
  }

  private refreshGift(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();
    this.giftService.getById(this.gift.id)
      .subscribe((gift: Gift) => {
        this.gift = gift;
        this.isLoading = false;
        this.checkQuantity();
        this.changeDetector.markForCheck();
      });
  }

  private checkQuantity(): void {
    if (this.gift.dibs && this.gift.dibs.length) {
      let numDibbed = 0;
      this.gift.dibs.forEach((dib) => {
        numDibbed += dib.quantity;
      });

      this.quantityRemaining = this.gift.quantity - numDibbed;
    }
  }
}
