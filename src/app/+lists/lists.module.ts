import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ListsRoutingModule
  ],
  declarations: [ListsComponent, ListComponent]
})
export class ListsModule { }
