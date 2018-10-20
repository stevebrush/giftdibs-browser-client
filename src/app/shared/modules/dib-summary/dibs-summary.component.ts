import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import {
  finalize
} from 'rxjs/operators';

import {
  AlertService,
  ModalClosedEventArgs,
  ModalService
} from '@app/ui';

import {
  SessionService
} from '@giftdibs/session';

import {
  Gift
} from '../gift';

import {
  DibEditComponent
} from '../dib-edit/dib-edit.component';

import {
  DibEditContext
} from '../dib-edit/dib-edit-context';

import {
  Dib,
  DibService
} from '../dib';

@Component({
  selector: 'gd-dibs-summary',
  templateUrl: './dibs-summary.component.html',
  styleUrls: ['./dibs-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DibsSummaryComponent implements OnInit, OnDestroy {
  @Input()
  public gift: Gift;

  @Output()
  public change = new EventEmitter<void>();

  public get isDibbedBySessionUser(): boolean {
    return this.gift.dibs && !!this.gift.dibs.find((dib: Dib) => {
      return this.isDibOwnedBySessionUser(dib);
    });
  }

  public get numRemaining(): number {
    let numRemaining = this.gift.quantity;

    if (this.gift.dibs) {
      this.gift.dibs.forEach((dib: Dib) => {
        numRemaining -= dib.quantity;
      });
    }

    return numRemaining;
  }

  public isSessionUser = false;
  public isLoading = false;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private dibService: DibService,
    private modalService: ModalService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.isSessionUser = this.sessionService.isSessionUser(this.gift.user.id);
  }

  public ngOnDestroy(): void {
    this.change.complete();
  }

  public removeDib(dib: Dib): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.dibService.remove(dib.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        (data: any) => {
          this.gift.dibs.splice(this.gift.dibs.indexOf(dib), 1);
          this.change.emit();
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  public openDibModal(dib?: Dib): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    const context = new DibEditContext(dib, this.gift);

    const modalInstance = this.modalService.open(
      DibEditComponent,
      {
        providers: [{
          provide: DibEditContext,
          useValue: context
        }]
      }
    );

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.change.emit();
      }

      this.isLoading = false;
      this.changeDetector.markForCheck();
    });
  }

  public isDibOwnedBySessionUser(dib: Dib): boolean {
    return (this.sessionService.isSessionUser(dib.user.id));
  }
}
