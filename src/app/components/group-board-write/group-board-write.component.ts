import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user';
import { GroupBoard } from 'src/app/group';
import { GroupBoardService } from 'src/app/group-board.service';

@Component({
  selector: 'app-group-board-write',
  templateUrl: './group-board-write.component.html',
  styleUrls: ['./group-board-write.component.css']
})
export class GroupBoardWriteComponent implements OnInit {
  postForm: FormGroup;
  currentUser: User;
  post: GroupBoard;
  currentGroupName: string;
  currentGroupIndex: number;

  constructor(fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private groupBoardService: GroupBoardService,
              ) {
    this.postForm = fb.group({
      'title': [''],
      'file': [],
      'contents': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn() && localStorage.getItem('groupName')) {
      this.currentUser = this.authService.currentUser();
      this.currentGroupName = localStorage.getItem('groupName');
      this.currentGroupIndex = Number(this.router.url.substring(25));
      localStorage.removeItem('groupName');
    } else {
      this.router.navigate(['/']);
    }
  }

  async postWrite(form: any) {
    if(form.title=="") {alert('제목을 입력해주세요.'); return;}
    else if(form.contents=="") {alert('내용을 입력해주세요.'); return;}
    this.post = {
      groupBoardIndex: 0,
      groupIndex: this.currentGroupIndex,
      groupName: this.currentGroupName,
      groupBoardTitle: form.title,
      groupBoardPosterId: this.currentUser.userId,
      groupBoardDate: new Date().toString(),
      groupBoardContent: form.contents,
    }
    if(form.file) this.post.file = form.file;
    var res = confirm("작성을 완료하시겠습니까?");
    if(res) {
      const token: any = await this.authService.getToken();
      this.groupBoardService
          .createGroupBoard(this.post, token)
          .subscribe(data => {
            if(data.success) {
              alert('게시글을 등록하였습니다.');
              this.router.navigate(['mygroup/detail/'+data.result.groupBoardIndex]);
            } else {
              alert('작성에 실패하였습니다.\n'+data.message);
            }
          });
    }
  }
}
