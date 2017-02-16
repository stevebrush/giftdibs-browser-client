import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  lists: any[] = [
    {
      id: 1,
      name: 'Christmas 2017',
      isPrivate: false
    },
    {
      id: 2,
      name: 'Lego',
      isPrivate: false
    },
    {
      id: 3,
      name: 'Video Games',
      isPrivate: true
    }
  ];
  constructor(private router: Router) { }
  ngOnInit() {}
  goToDetail(list: any): void {
    this.router.navigate(['./lists', list.id]);
  }
}
