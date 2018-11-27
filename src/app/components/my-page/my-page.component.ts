import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../user';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
    } else {
      this.router.navigate(['signin']);
    }
  }
}
