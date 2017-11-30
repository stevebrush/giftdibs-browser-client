import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  GiftService,
  ScraperService
} from '../_services';

import {
  Gift
} from '../_models';

@Component({
  selector: 'app-gift-create-form',
  templateUrl: './gift-create.component.html',
  styleUrls: ['./gift-create.component.scss']
})
export class GiftCreateComponent implements OnInit {
  public giftForm: FormGroup;
  public isLoading = false;
  public errors: any;

  @Input()
  public wishListId: string;

  @Output()
  public onSuccess: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onError: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('nameInput')
  public nameInput: ElementRef;

  constructor(
    private giftService: GiftService,
    private scraperService: ScraperService,
    private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.createForm();
    this.nameInput.nativeElement.focus();
  }

  public onKeyUp(event: KeyboardEvent): void {
    if (event.which === 13 && !this.isLoading) {
      event.preventDefault();
      this.createGift();
    }
  }

  public createGift(): void {
    this.isLoading = true;

    const formData = this.giftForm.value;
    const isUrl = (/^https?:\/\//.test(formData.name));

    if (isUrl) {
      this.scraperService
        .getProductDetailsFromUrl(formData.name)
        .first()
        .subscribe(
          (data: any) => {
            const productInfo = data.products[0];
            this.addGift({
              _wishList: this.wishListId,
              externalUrls: [productInfo],
              budget: productInfo.price,
              name: productInfo.name,
              quantity: 1
            });
          },
          (err: any) => this.onError.emit(err)
        );
    } else {
      this.addGift(formData);
    }
  }

  private addGift(formData: Gift): void {
    this.giftService
      .create(formData)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.giftForm.reset({
            _wishList: this.wishListId
          });
          this.onSuccess.emit(data.giftId);
        },
        (err: any) => {
          this.errors = err.error.errors;
          this.onError.emit(err);
        }
      );
  }

  private createForm(): void {
    this.giftForm = this.formBuilder.group({
      _wishList: this.wishListId,
      name: '',
      priority: 5
    } as Gift);
  }
}
