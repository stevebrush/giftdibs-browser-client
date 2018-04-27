import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  ConfirmAnswer,
  ConfirmService
} from '../../../modules/confirm';

import {
  DropdownMenuItem
} from '../../../modules/dropdown-menu';

import { WishList } from '../wish-list';

@Component({
  selector: 'gd-wish-list-preview',
  templateUrl: './wish-list-preview.component.html',
  styleUrls: ['./wish-list-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListPreviewComponent {
  @Input()
  public wishList: WishList;

  public menuItems: DropdownMenuItem[] = [
    {
      icon: 'pencil-alt',
      label: 'Edit',
      action: () => {
        console.log('edit');
      },
      addSeparatorAfter: true
    },
    {
      icon: 'trash-alt',
      label: 'Delete',
      action: () => {
        this.confirmDelete();
      }
    }
  ];

  constructor(
    private confirmService: ConfirmService
  ) { }

  private confirmDelete(): void {
    this.confirmService.confirm({
      message: 'Are you sure?'
    }, (answer: ConfirmAnswer) => {
      if (answer.type === 'okay') {
        console.log('DELETE WISH LIST');
      }
    });
  }
}
