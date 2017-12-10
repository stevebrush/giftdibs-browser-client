import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { GDAlertService } from '../_modules';

import { User } from '../_models';
import { WishListService } from '../_services';

@Component({
  selector: 'app-wish-list-create-form',
  templateUrl: './wish-list-create.component.html',
  styleUrls: ['./wish-list-create.component.scss']
})
export class WishListCreateComponent implements OnInit {
  public wishListForm: FormGroup;
  public isLoading = false;
  public isActive = false;
  public errors: any;

  @Input()
  public user: User;

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public onError: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('nameInput')
  public nameInput: ElementRef;

  constructor(
    private alertService: GDAlertService,
    private wishListService: WishListService,
    private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public createWishList(): void {
    this.isLoading = true;
    const formData = this.wishListForm.value;
    this.wishListService
      .create(formData)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.wishListForm.reset();
          this.onSuccess.emit(data);
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.errors = err.error.errors;
          this.onError.emit(err);
          this.alertService.error(err.error.message);
        }
      );
  }

  public toggleIsActive(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      setTimeout(() => {
        this.nameInput.nativeElement.focus();
      }, 0);
    }
  }

  private createForm(): void {
    this.wishListForm = this.formBuilder.group({
      name: ''
    });
  }
}
