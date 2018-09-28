import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }

}
