import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalHeaderComponent implements OnInit {
  @Input()
  public showCloseButton = false;

  constructor() { }

  public ngOnInit(): void { }
}
