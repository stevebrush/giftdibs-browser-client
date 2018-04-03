import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'gd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.sessionService.isLoggedIn;
  }
}
