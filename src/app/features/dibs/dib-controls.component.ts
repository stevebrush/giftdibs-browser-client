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
} from '../../modules';

import {
  SessionService
} from '../account/session';

import {
  Gift
} from '../gifts/gift';

import {
  DibEditComponent
} from './dib-edit.component';

import {
  DibEditContext
} from './dib-edit-context';

import {
  Dib
} from './dib';

import {
  DibService
} from './dib.service';

@Component({
  selector: 'gd-dib-controls',
  templateUrl: './dib-controls.component.html',
  styleUrls: ['./dib-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DibControlsComponent implements OnInit, OnDestroy {
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
    private dibService: DibService,
    private modalService: ModalService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.isSessionUser = this.sessionService.isSessionUser(this.gift.user._id);
    if (this.gift.dibs) {
      this.dib = this.gift.dibs.find((dib) => {
        return (dib.user._id === this.sessionService.user._id);
      });
    }
  }

  public ngOnDestroy(): void {
    this.change.complete();
  }

  public removeDib(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.dibService.remove(this.dib._id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        (data: any) => {
          this.gift.dibs.splice(this.gift.dibs.indexOf(this.dib), 1);
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
}
