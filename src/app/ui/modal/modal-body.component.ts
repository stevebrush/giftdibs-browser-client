import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalBodyComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void { }
}
