import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services';

@Component({
  selector: 'gd-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
  }
}
