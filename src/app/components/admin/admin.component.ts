import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from 'src/app/user.service';
import { GroupService } from 'src/app/group.service';
import { Group } from 'src/app/group';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  groups: Group[];
  
  constructor(private userService: UserService,
              private groupService: GroupService,) { }

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
    this.userService
        .deleteUser(id).subscribe(() => this.ngOnInit());
  }

  ngOnInit() {
    this.getUsers();
    this.getGroups();
  }
}