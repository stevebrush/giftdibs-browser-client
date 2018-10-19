import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent implements OnInit {
  @Input()
  public screenXXSmall: number;

  @Input()
  public screenXSmall: number;

  @Input()
  public screenSmall: number;

  @Input()
  public screenMedium: number;

  @Input()
  public screenLarge: number;

  @HostBinding('class')
  public classNames: string;

  public getClassNames(): string {
    const classNames = [
      'gd-column'
    ];

    if (this.screenXSmall) {
      classNames.push(`gd-column-xs-${this.screenXSmall}`);
    }

    if (this.screenSmall) {
      classNames.push(`gd-column-sm-${this.screenSmall}`);
    }

    if (this.screenMedium) {
      classNames.push(`gd-column-md-${this.screenMedium}`);
    }

    if (this.screenLarge) {
      classNames.push(`gd-column-lg-${this.screenLarge}`);
    }

    return classNames.join(' ');
  }

  public ngOnInit(): void {
    this.classNames = this.getClassNames();
  }
}
