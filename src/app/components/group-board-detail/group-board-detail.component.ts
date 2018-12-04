import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GroupBoard } from 'src/app/group';
import { GroupBoardService } from 'src/app/group-board.service';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-group-board-detail',
  templateUrl: './group-board-detail.component.html',
  styleUrls: ['./group-board-detail.component.css']
})
export class GroupBoardDetailComponent implements OnInit {
  isWriter: boolean;
  post: GroupBoard = {
    groupBoardIndex: 0,
    groupIndex: 0,
    groupName: "",
    groupBoardTitle: "",
    groupBoardPosterId: "",
    groupBoardDate: "",
    groupBoardContent: "",
  };
  currentUser: User;

  constructor(private router: Router,
              private groupBoardService: GroupBoardService,
              private authService: AuthService,) {
    this.isWriter = false;
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
      this.getPost();
    }
  }

  async getPost() {
    var index = Number(this.router.url.substring(16));
    const token: any = await this.authService.getToken();
    this.groupBoardService
        .getGroupBoardByIndex(index, token)
        .subscribe(data => {
          if(data.success) {
            this.post = data.result[0];
            this.check();
          } else console.log(data.message);
        });
  }

  check() {
    if(this.currentUser.userId == this.post.groupBoardPosterId) {
      this.isWriter = true;
    } else {
      this.isWriter = false;
    }
  }

}
