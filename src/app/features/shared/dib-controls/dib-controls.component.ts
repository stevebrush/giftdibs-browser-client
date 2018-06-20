import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  finalize
} from 'rxjs/operators';

import {
  AlertService,
  ConfirmAnswer,
  ConfirmService,
  ModalClosedEventArgs,
  ModalService
} from '../../../modules';

import {
  SessionService
} from '../../account/session';

import {
  Gift
} from '../../gifts/gift';

import {
  DibEditComponent,
  DibEditContext
} from '../dib-edit';

import {
  Dib,
  DibService
} from '../../dibs';

@Component({
  selector: 'gd-dib-controls',
  templateUrl: './dib-controls.component.html',
  styleUrls: ['./dib-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DibControlsComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public gift: Gift;

  @Output()
  public change = new EventEmitter<void>();

  public dib: Dib;
  public isSessionUser = false;
  public isLoading = false;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private dibService: DibService,
    private modalService: ModalService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.isSessionUser = this.sessionService.isSessionUser(this.gift.user.id);
    this.refreshDib();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.gift = changes.gift.currentValue;
    this.refreshDib();
    this.changeDetector.markForCheck();
  }

  public ngOnDestroy(): void {
    this.change.complete();
  }

  public removeDib(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.dibService.remove(this.dib.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        () => {
          this.refreshDib();
          this.change.emit();
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  public openDibModal(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    const context = new DibEditContext(
      this.dib,
      this.gift
    );

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

  public markAsDelivered(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.confirmService.confirm({
      message: 'Are you sure? This action cannot be undone.'
    }, (answer: ConfirmAnswer) => {
      if (answer.type === 'okay') {
        this.dibService.update(this.dib.id, {
          isDelivered: true
        })
          .pipe(
            finalize(() => {
              this.isLoading = false;
              this.changeDetector.markForCheck();
            })
          )
          .subscribe(
            () => {
              this.refreshDib();
              this.change.emit();
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

  private refreshDib(): void {
    if (this.gift.dibs) {
      this.dib = this.gift.dibs.find((dib) => {
        return (dib.user.id === this.sessionService.user.id);
      });
    } else {
      this.dib = undefined;
    }
  }
}
