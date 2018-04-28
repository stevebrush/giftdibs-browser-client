import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-modal-heading',
  templateUrl: './modal-heading.component.html',
  styleUrls: ['./modal-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalHeadingComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }
}
