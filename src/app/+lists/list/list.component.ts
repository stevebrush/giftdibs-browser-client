import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListService } from '../../shared/services';
import { List } from '../../shared/list';

@Component({
  selector: 'app-list',
  template: `
    <h1>{{list?.name}}</h1>
  `
})
export class ListComponent implements OnInit, OnDestroy {
  list: List;
  private sub: any;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       const id = Number(params['id']);
       this.listService.getById(id).then(data => this.list = data);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
