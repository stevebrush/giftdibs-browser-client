import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: any = {
    id: 1,
    firstName: 'Steve',
    lastName: 'Brush'
  };

  constructor() { }

  ngOnInit() { }
}
