import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../user';
import { UserService } from 'src/app/user.service';
import { GroupService } from 'src/app/group.service';
import { Group } from 'src/app/group';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  groups: Group[];
  
  constructor(private userService: UserService,
              private groupService: GroupService,
              private authService: AuthService,
              private router: Router) { }

  getUsers() {
    this.userService
        .getUsers()
        .subscribe((users)=>{
          this.users = users.result;
        });
  }

  getGroups() {
    this.groupService
        .listGroup()
        .subscribe(data => {
          if(data.success) {
            this.groups = data.result;
          } else {
            console.log(data.message);
          }
        });
  }

  deleteUser(id: string) {
    // this.userService
    //     .deleteUser(id).subscribe(() => this.ngOnInit());
  }

  ngOnInit() {
    if(this.authService.isAdmin()) {
      this.getUsers();
      this.getGroups();
    } else {
      this.router.navigate(['/']);
    }
  }
}