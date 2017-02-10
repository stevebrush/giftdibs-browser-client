import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="card">
      <ul class="media-list">
        <li class="media" *ngFor="let list of lists">
          <div class="media-left">
            <a href="#">
              <img class="media-object" src="..." alt="...">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{list.name}}</h4>
          </div>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lists: any[] = [
    {
      name: 'Xmas 2017'
    },
    {
      name: 'Video Games'
    }
  ];
  constructor() { }
  ngOnInit() {}
}
