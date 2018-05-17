import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  ModalClosedEventArgs,
  ModalService
} from '../../../modules/modal';

import {
  SessionService
} from '../../../modules/session';

import { WishListEditContext } from '../edit/wish-list-edit-context';
import { WishListEditComponent } from '../edit/wish-list-edit.component';
import { WishList } from '../wish-list';
import { WishListService } from '../wish-list.service';

import {
  GiftEditComponent,
  GiftEditContext
} from '../gifts/edit';

import {
  Gift
} from '../gifts';

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

  public openGiftModal(gift?: Gift): void {
    const context = new GiftEditContext(gift, this.wishList._id);

    const modalInstance = this.modalService.open(GiftEditComponent, {
      providers: [{
        provide: GiftEditContext,
        useValue: context
      }]
    });

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      console.log('closed', args);
    });
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

    modalInstance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        this.wishListService
          .getById(this.wishList._id)
          .subscribe((wishList: WishList) => {
            this.wishList = wishList;
            this.changeDetector.markForCheck();
          });
      }

      this.dropdownTrigger.nativeElement.focus();
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
