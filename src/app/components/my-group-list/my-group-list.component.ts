import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from 'src/app/group';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user';
import { GroupService } from 'src/app/group.service';

@Component({
  selector: 'app-my-group-list',
  templateUrl: './my-group-list.component.html',
  styleUrls: ['./my-group-list.component.css']
})
export class MyGroupListComponent implements OnInit {
  groups: Group[];
  groupName: string;
  groupIndex: number;
  currentUser: User;

  constructor(private authService: AuthService,
              private groupService: GroupService,
              private router: Router,) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
      this.getGroups();
    } else{
      this.router.navigate(['/']);
    }
  }

  getGroups() {
    this.groupService
        .listMyGroup(this.currentUser.userId, this.authService.getToken())
        .subscribe(data => {
          if(data.success) {
            this.groups = data.result;
          } else {
            console.log(data.message);
          }
        });
  }

  deleteGroup(index: number) {
    var res = confirm("그룹을 삭제하시겠습니까?");
    if(res) {
      this.groupService
        .deleteGroup(index, this.authService.getToken())
        .subscribe(data => {
          if(data.success) {
            alert("그룹을 삭제하였습니다.");
            this.ngOnInit();
          } else {
            alert("그룹 삭제에 실패하였습니다.\n"+data.message);
          }
        });
    }
  }

  memberOut(index: number) {
    var res = confirm("이 그룹에서 탈퇴하시겠습니까?");
    if(res) {
      this.groupService
        .removeMember(index, this.currentUser.userId, this.authService.getToken())
        .subscribe(data => {
          if(data.success) {
            alert("그룹에서 탈퇴하였습니다.");
            this.ngOnInit();
          } else {
            alert("그룹 탈퇴에 실패하였습니다.\n"+data.message);
          }
        });
    }
  }
}