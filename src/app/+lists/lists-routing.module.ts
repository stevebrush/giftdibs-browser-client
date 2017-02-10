import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent,
         ListsComponent } from './lists-components';

const routes: Routes = [
  { path: '', component: ListsComponent },
  { path: ':id', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ListsRoutingModule { }
