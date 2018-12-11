import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { GroupBoard } from 'src/app/models/group';

import { AuthService } from 'src/app/service/auth.service';
import { GroupBoardService } from 'src/app/service/group-board.service';

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
  searchForm: FormGroup;
  searchPost: GroupBoard[] = [];
  searchClicked: boolean;
  countList: number = 5; // paging용 변수
  totalPost: number = 0;
  totalPage: number = 0;
  countPage: number = 3;
  currentPage: number = 1;
  startPage: number = 1;
  endPage: number = 3;
  S: number = 0;
  E: number = 4; // 여기까지

  constructor(fb: FormBuilder, private router: Router,
              private groupBoardService: GroupBoardService,
              private authService: AuthService,) {
    this.searchForm = fb.group({
      'searchTerm': [''],
      'searchText': ['']
    });
    this.searchClicked = false;
  }

  ngOnInit() {
    if(this.authService.isLoggedIn() && localStorage.getItem('groupName')) {
      this.currentUser = this.authService.currentUser();
      this.currentGroupIndex = Number(localStorage.getItem('groupIndex'));
      this.currentGroupName = localStorage.getItem('groupName');
      this.getGroupBoards();
    } else{
      this.router.navigate(['/']);
    }
  }

  async getGroupBoards() {
    const token: any = await this.authService.getToken();
    this.groupBoardService
        .getGroupBoardByGroup(this.currentGroupIndex, token)
        .subscribe(data => {
          if(data.success) {
            this.allGroupBoard = data.result;
            this.totalPost = this.allGroupBoard.length;
            this.totalPage = parseInt((this.totalPost / this.countList).toString());
            if (this.totalPost % this.countList > 0) {
              this.totalPage++;
            }
            this.startPage = ((this.currentPage-1)/this.countPage) * this.countPage + 1;
            this.startPage = parseInt(this.startPage.toString());
            if(this.startPage%this.countPage == 2) {
              this.startPage--;
            } else if(this.startPage%this.countPage == 0) {
              this.startPage -= 2;
            }
            this.endPage = this.startPage + this.countPage - 1;
            if (this.endPage > this.totalPage) {
              this.endPage = this.totalPage;
            }
            this.S = (this.currentPage-1) * this.countList;
            this.E = this.S + this.countList;
            if(this.E>this.totalPost) {
              this.E = this.totalPost;
            }
          }
          else console.log(data.message);
        })
  }

  onSearch(form: any) {
    var txt = form.searchText;
    if(txt != "") {
      this.searchPost = [];
      if(form.searchTerm == "") {
        alert('검색 조건을 선택하세요.');
        return;
      } else if(form.searchTerm == "boardTitle") {
        for (var i=0; i<this.allGroupBoard.length; i++) {
          if(this.allGroupBoard[i].groupBoardTitle.includes(txt)) {
            this.searchPost.push(this.allGroupBoard[i]);
          }
        }
      } else if(form.searchTerm == "userId") {
        for (var i=0; i<this.allGroupBoard.length; i++) {
          if(this.allGroupBoard[i].groupBoardPosterId.includes(txt)) {
            this.searchPost.push(this.allGroupBoard[i]);
          }
        }
      }
      if(this.searchPost[0] != null) {
        this.searchClicked = true;
      } else {
        this.searchClicked = false;
        alert("검색결과가 존재하지 않습니다.");
      }
    }
  }

  page(x: number) {
    this.currentPage = x;
    this.ngOnInit();
  }

  pre() {
    this.startPage -= 3;
    this.endPage = this.startPage + this.countPage - 1;
    if (this.endPage > this.totalPage) {
      this.endPage = this.totalPage;
    }
  }

  next() {
    this.startPage += 3;
    this.endPage = this.startPage + this.countPage - 1;
    if (this.endPage > this.totalPage) {
      this.endPage = this.totalPage;
    }
  }
}
