import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DibsComponent } from './dibs.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DibsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DibsRoutingModule { }
