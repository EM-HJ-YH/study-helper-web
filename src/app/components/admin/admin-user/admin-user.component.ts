import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';

import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  users: User[];
  
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(this.authService.isAdmin()) {
      this.getUsers();
      this.getGroups();
      this.getCafes();
    } else {
      this.router.navigate(['/']);
    }
  }

  async getUsers() {
    const token: any = await this.authService.getToken();
    this.userService
        .getUsers(token)
        .subscribe((users)=>{
          this.users = users.result;
        });
  }

  async deleteUser(id: string) {
    const token: any = await this.authService.getToken();
    this.userService
        .deleteUser(id, token).subscribe(() => this.ngOnInit());
  }
}