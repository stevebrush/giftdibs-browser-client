import {
  Injectable,
  OnDestroy
} from '@angular/core';

import {
  BehaviorSubject,
  Observable
} from 'rxjs';

import {
  WishListBoardChange
} from './wish-list-board-change';

@Injectable()
export class WishListBoardService implements OnDestroy {
  public get change(): Observable<WishListBoardChange> {
    return this._change;
  }

  private _change = new BehaviorSubject<WishListBoardChange>({});

  public ngOnDestroy(): void {
    this._change.complete();
  }

  public notifyChange(change: WishListBoardChange): void {
    this._change.next(change);
  }
}
