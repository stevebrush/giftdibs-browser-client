import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

import {
  DibService,
  SessionService
} from '../_services';

import {
  Dib,
  Gift
} from '../_models';

@Component({
  selector: 'app-dib-controls',
  templateUrl: './dib-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DibControlsComponent implements OnChanges {
  @Input()
  public dibs: Dib[];

  @Input()
  public gift: Gift;

  @Output()
  public onChanges: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onError: EventEmitter<any> = new EventEmitter<any>();

  public activeDib: Dib;
  public numRemaining: number;
  public isDibbedByCurrentUser = false;
  public isLoading = false;
  public isCurrentUser = false;

  constructor(
    private dibService: DibService,
    private sessionService: SessionService) { }

  public ngOnChanges(changes: any) {
    if (changes.dibs) {
      this.numRemaining = this.gift.quantity;

      this.dibs.forEach((dib: Dib) => {
        this.numRemaining -= dib.quantity;
        if (dib._user._id === this.sessionService.user._id) {
          this.isDibbedByCurrentUser = true;
        }
      });
    }
  }

  public onEditSuccess(data: any) {
    this.activeDib = undefined;
    this.onChanges.emit(data);
  }

  public onEditError(data: any) {
    this.onError.emit(data);
  }

  public createDib(): void {
    this.isLoading = true;
    this.dibService
      .create({
        _gift: this.gift._id,
        quantity: 1
      })
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.onChanges.emit(data);
        },
        (err: any) => {
          this.onError.emit(err.error);
        }
      );
  }

  public removeDib(dib: Dib): void {
    this.isLoading = true;

    this.dibService
      .remove(dib._id)
      .first()
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe(
        (data: any) => {
          this.onChanges.emit(data);
        },
        (err: any) => {
          this.onError.emit(err);
        }
      );
  }

  public isDibOwnedByCurrentUser(dib: Dib): boolean {
    return (dib._user._id === this.sessionService.user._id);
  }
}
