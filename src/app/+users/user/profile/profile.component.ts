import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListService } from '../../../shared/services';
import { List } from '../../../shared/list';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  lists: List[];

  constructor(private router: Router, private listService: ListService) { }

  ngOnInit() {
    this.listService.getAll().then((data) => {
      this.lists = data as List[];
    });
  }

  goToDetail(list: any): void {
    this.router.navigate(['./lists', list.id]);
  }
}
