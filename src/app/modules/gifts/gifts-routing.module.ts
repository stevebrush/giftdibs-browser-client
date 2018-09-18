import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  GiftComponent
} from './gift.component';

const routes: Routes = [
  {
    path: ':giftId',
    pathMatch: 'full',
    component: GiftComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftsRoutingModule { }
