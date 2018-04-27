import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { ConfirmContext } from './confirm-context';

@Component({
  selector: 'gd-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent implements OnInit {
  public message: string;

  constructor(
    private context: ConfirmContext
  ) { }

  public ngOnInit(): void {
    this.message = this.context.config.message;
  }

  public confirm(): void {
    this.context.answer({
      type: 'okay'
    });
  }

  public cancel(): void {
    this.context.answer({
      type: 'cancel'
    });
  }
}
