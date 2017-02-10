import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `<h1>Users</h1>`
})
export class UsersComponent implements OnInit {
  user: any = {
    id: 1,
    firstName: 'Steve',
    lastName: 'Brush'
  };
  constructor() { }
  ngOnInit() { }
}
