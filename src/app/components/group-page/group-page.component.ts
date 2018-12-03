import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GroupBoard } from 'src/app/group';
import { GroupBoardService } from 'src/app/group-board.service';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  allGroupBoard: GroupBoard[];
  currentUser: User;
  currentGroupIndex: number;
  currentGroupName: string;

  constructor(private router: Router,
              private groupBoardService: GroupBoardService,
              private authService: AuthService,) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
      this.currentGroupIndex = Number(this.router.url.substring(9));
      this.getGroupBoards();
    } else{
      this.router.navigate(['/']);
    }
  }

  getGroupBoards() {
    this.groupBoardService
        .listGroupBoard()
        .subscribe(data => {
          if(data.success) {
            this.allGroupBoard = data.result;
            this.currentGroupName = this.allGroupBoard[0].groupName;
          }
          else console.log(data.message);
        })
  }

}
