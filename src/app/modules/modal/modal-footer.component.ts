import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'gd-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalFooterComponent implements OnInit {
  @Output()
  public cancelClicked = new EventEmitter<void>();

  constructor() { }

  public ngOnInit(): void { }

  public onClick(): void {
    this.cancelClicked.emit();
    this.cancelClicked.complete();
  }
}
