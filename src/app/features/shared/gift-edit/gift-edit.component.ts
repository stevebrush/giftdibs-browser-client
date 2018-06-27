import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  AlertService,
  ModalInstance
} from '../../../modules';

import {
  Gift,
  GiftService
} from '../../gifts';

import {
  GiftEditContext
} from './gift-edit-context';

@Component({
  selector: 'gd-gift-edit',
  templateUrl: './gift-edit.component.html',
  styleUrls: ['./gift-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftEditComponent implements OnInit {
  public get externalUrls(): FormArray {
    return <FormArray>this.giftForm.get('externalUrls');
  }

  public errors: any[];
  public gift: Gift;
  public giftForm: FormGroup;
  public isLoading = false;

  private wishListId: string;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private context: GiftEditContext,
    private giftService: GiftService,
    private modal: ModalInstance<any>
  ) { }

  public ngOnInit(): void {
    this.createForm();

    this.gift = this.context.gift;
    this.wishListId = this.context.wishListId;

    if (this.gift) {
      this.giftForm.reset(this.gift);
      this.giftForm.setControl('externalUrls', this.formBuilder.array([]));

      const control = this.externalUrls;
      this.gift.externalUrls.forEach((externalUrl: any) => {
        control.push(this.formBuilder.group(externalUrl));
      });
    }
  }

  public submit(): void {
    if (this.giftForm.disabled) {
      return;
    }

    this.giftForm.disable();
    this.isLoading = true;
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData: Gift = this.giftForm.value;

    // Need to manually retrieve the form data of the nested forms:
    formData.externalUrls = this.externalUrls.value;

    let obs: any;
    if (this.gift) {
      obs = this.giftService.update(this.gift.id, formData);
    } else {
      obs = this.giftService.create(this.wishListId, formData);
    }

    obs.subscribe(
      (result: any) => {
        const giftId = (this.gift) ? this.gift.id : result.data.giftId;
        this.giftService.getById(giftId).subscribe((gift: Gift) => {
          this.modal.close('save', { gift });
        });
      },
      (err: any) => {
        const error = err.error;
        this.alertService.error(error.message);
        this.errors = error.errors;
        this.giftForm.enable();
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    );
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  public addExternalUrlField(): void {
    const externalUrls = <FormArray>this.giftForm.controls.externalUrls;
    externalUrls.push(this.createExternalUrlForm());
  }

  public removeUrl(index: number): void {
    this.externalUrls.removeAt(index);
  }

  private createForm(): void {
    this.giftForm = this.formBuilder.group({
      budget: undefined,
      externalUrls: this.formBuilder.array([]) as any,
      isReceived: new FormControl(false),
      name: new FormControl(null, [
        Validators.required
      ]),
      priority: 3,
      quantity: 1
    });
  }

  private createExternalUrlForm(): FormGroup {
    return this.formBuilder.group({
      url: undefined
    });
  }
}
