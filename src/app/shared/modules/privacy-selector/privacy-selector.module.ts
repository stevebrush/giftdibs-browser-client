import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@giftdibs/ux';
import { ChecklistModule, DropdownMenuModule, ModalModule } from '@giftdibs/ux';

import { PrivacySelectorUsersComponent } from './privacy-selector-users.component';
import { PrivacySelectorComponent } from './privacy-selector.component';

@NgModule({
    imports: [
        ChecklistModule,
        CommonModule,
        DropdownMenuModule,
        FormsModule,
        IconModule,
        ModalModule,
        ReactiveFormsModule,
    ],
    declarations: [PrivacySelectorComponent, PrivacySelectorUsersComponent],
    exports: [PrivacySelectorComponent]
})
export class PrivacySelectorModule {}
