import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input()
  public screenXSmall: number;

  @Input()
  public screenSmall: number;

  @Input()
  public screenMedium: number;

  @Input()
  public screenLarge: number;

  @HostBinding('class')
  private classnames: string;

  public getClassNames(): string {
    const classNames = [
      'app-column'
    ];

    if (this.screenXSmall) {
      classNames.push(`app-column-xs-${this.screenXSmall}`);
    }

    if (this.screenSmall) {
      classNames.push(`app-column-sm-${this.screenSmall}`);
    }

    if (this.screenMedium) {
      classNames.push(`app-column-md-${this.screenMedium}`);
    }

    if (this.screenLarge) {
      classNames.push(`app-column-lg-${this.screenLarge}`);
    }

    return classNames.join(' ');
  }

  public ngOnInit(): void {
    this.classnames = this.getClassNames();
  }
}
