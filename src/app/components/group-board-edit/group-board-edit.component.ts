import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupBoard } from 'src/app/group';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';
import { GroupBoardService } from 'src/app/group-board.service';

@Component({
  selector: 'app-group-board-edit',
  templateUrl: './group-board-edit.component.html',
  styleUrls: ['./group-board-edit.component.css']
})
export class GroupBoardEditComponent implements OnInit {
  post: GroupBoard = {
    groupBoardIndex: 0,
    groupIndex: 0,
    groupName: '',
    groupBoardTitle: '',
    groupBoardPosterId: '',
    groupBoardDate: '',
    groupBoardContent: '',
  };
  postEditForm: FormGroup;
  currentUser: User;

  constructor(fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private groupBoardService: GroupBoardService,) {
    this.postEditForm = fb.group({
      'title': [''],
      'file': [],
      'contents': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
      this.getPost();
    } else {
      this.router.navigate(['/']);
    }
  }

  async getPost() {
    var index = Number(localStorage.getItem('groupBoardIndex'));
    const token: any = await this.authService.getToken();
    this.groupBoardService
        .getGroupBoardByIndex(index, token)
        .subscribe(data => {
          if(data.success) {
            this.post = data.result;
          } else console.log(data.message);
        });
  }

  async postEdit(form: any) {
    if(form.title != "") this.post.groupBoardTitle = form.title;
    if(form.file != "") this.post.file = form.file;
    if(form.contents != "") this.post.groupBoardContent = form.contents;
    var res = confirm("수정을 완료하시겠습니까?");
    if(res) {
      const token: any = await this.authService.getToken();
      this.groupBoardService
          .updateGroupBoard(this.post, token)
          .subscribe(data => {
            if(data.success) {
              alert("수정이 완료되었습니다.");
              this.router.navigate(['mygroup/detail/'+data.result.groupBoardIndex]);
            } else {
              alert("수정에 실패하였습니다.\n"+data.message);
            }
          });
    }
  }
}
