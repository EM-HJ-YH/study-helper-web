import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from 'src/app/post';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post-write',
  templateUrl: './post-write.component.html',
  styleUrls: ['./post-write.component.css']
})
export class PostWriteComponent implements OnInit {
  postForm: FormGroup;
  post: Post;
  currentUser: User;

  constructor(fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private postService: PostService,) {
    this.postForm = fb.group({
      'title': [''],
      'maxNum': [''],
      'file': [],
      'contents': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
    } else {
      this.router.navigate(['/']);
    }
  }

  postWrite(form: any) {
    if(form.title=="") {alert('제목을 입력해주세요.'); return;}
    else if(form.maxNum=="") {alert('모집 인원을 선택해주세요.'); return;}
    else if(form.contents=="") {alert('내용을 입력해주세요.'); return;}
    this.post = {
      boardIndex: 0,
      boardTitle: form.title,
      userId: this.currentUser.userId,
      boardDate: new Date().toString(),
      boardContent: form.contents,
      memberCount: Number(form.maxNum),
      isRecruiting: true,
      members: [this.currentUser.userId],
    }
    if(form.file) this.post.file = form.file;
    var res = confirm("작성을 완료하시겠습니까?");
    if(res) {
      this.postService
          .registerPost(this.post, this.authService.getToken())
          .subscribe(data => {
            if(data.success) {
              alert('모집글을 등록하였습니다.');
              this.router.navigate(['recruitment/detail/'+data.result.boardIndex]);
            } else {
              alert('작성에 실패하였습니다.\n'+data.message);
            }
          });
    }
  }
}
