import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  AlertService,
  dataUrlToFile,
  ModalClosedEventArgs,
  ModalInstance,
  ModalService,
  ModalSize,
  toDataUrl
} from '@giftdibs/ux';

import { AssetsService } from '@app/shared/modules/assets';
import { Gift } from '@app/shared/modules/gift';
import { GiftMoveComponent, GiftMoveContext } from '@app/shared/modules/gift-move';
import { Product } from '@app/shared/modules/product';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewComponent {
  @Input()
  public product: Product;

  constructor(
    private alertService: AlertService,
    private assetService: AssetsService,
    private modalService: ModalService
  ) { }

  public addProductToWishList(): void {
    const gift: Gift = {
      name: this.product.name,
      budget: this.product.price,
      externalUrls: [{
        url: this.product.url
      }]
    };

    const instance = this.openGiftMoveModal(gift);

    const newGiftSuccess = () => {
      this.alertService.success('Item successfully added to your wish list!');
    };

    instance.closed.subscribe((args: ModalClosedEventArgs) => {
      if (args.reason === 'save') {
        toDataUrl(this.product.imageUrl).then((dataUrl: any) => {
          const file = dataUrlToFile(dataUrl);
          this.assetService.uploadGiftThumbnail(file, args.data.giftId)
            .subscribe((result: any) => {
              newGiftSuccess();
            }, (err: any) => {
              newGiftSuccess();
            });
        }).catch(() => {
          newGiftSuccess();
        });
      }
    });
  }

  private openGiftMoveModal(gift: Gift): ModalInstance<GiftMoveComponent> {
    const wishListId = gift.wishList && gift.wishList.id;

    const modalInstance = this.modalService.open(GiftMoveComponent, {
      providers: [{
        provide: GiftMoveContext,
        useValue: {
          gift,
          title: 'Add item to wish list',
          wishListId
        }
      }],
      size: ModalSize.Small
    });

    return modalInstance;
  }
}
