import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  AlertService
} from '../../../modules/alert';

import {
  ConfirmAnswer,
  ConfirmService
} from '../../../modules/confirm';

import {
  DropdownMenuItem
} from '../../../modules/dropdown-menu';

import {
  ModalService
} from '../../../modules/modal';

import {
  SessionService
} from '../../../modules/session';

import { WishList } from '../wish-list';
import { WishListService } from '../wish-list.service';
import { WishListEditComponent } from '../edit/wish-list-edit.component';
import { WishListEditContext } from '../edit/wish-list-edit-context';

@Component({
  selector: 'gd-wish-list-preview',
  templateUrl: './wish-list-preview.component.html',
  styleUrls: ['./wish-list-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListPreviewComponent implements OnInit {
  @Input()
  public wishList: WishList;

  @Output()
  public removed = new EventEmitter<void>();

  public isSessionUser = false;
  public menuItems: DropdownMenuItem[] = [
    {
      icon: 'pencil-alt',
      label: 'Edit',
      action: () => {
        this.openEditModal();
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

  @ViewChild('dropdownTrigger')
  private dropdownTrigger: ElementRef;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private confirmService: ConfirmService,
    private modalService: ModalService,
    private sessionService: SessionService,
    private wishListService: WishListService
  ) { }

  public ngOnInit(): void {
    this.isSessionUser = this.sessionService.isSessionUser(this.wishList.user._id);
  }

  private openEditModal(): void {
    const context = new WishListEditContext();
    context.wishList = this.wishList;

    const modalInstance = this.modalService.open(WishListEditComponent, {
      providers: [{
        provide: WishListEditContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe(() => {
      this.dropdownTrigger.nativeElement.focus();
    });

    modalInstance.componentInstance.succeeded.subscribe((updated: WishList) => {
      this.wishList = updated;
      this.changeDetector.markForCheck();
    });
  }

  private confirmDelete(): void {
    this.confirmService.confirm({
      message: 'Are you sure?'
    }, (answer: ConfirmAnswer) => {
      if (answer.type === 'okay') {
        this.wishListService
          .remove(this.wishList._id)
          .subscribe(
            (data: any) => {
              this.alertService.success(data.message);
              this.removed.emit();
              this.removed.complete();
            },
            (err: any) => {
              this.alertService.error(err.error.message);
            }
          );
      }
    });
  }
}
