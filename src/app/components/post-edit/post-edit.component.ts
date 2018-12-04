import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from '../../post';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post = {
    boardIndex: 0,
    boardTitle: "",
    userId: "",
    boardDate: "",
    boardContent: "",
    memberCount: 0,
    members: [""],
    isRecruiting: null,
  };
  postEditForm: FormGroup;
  currentUser: User;

  constructor(fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private postService: PostService,) {
    this.postEditForm = fb.group({
      'title': [''],
      'maxNum': [''],
      'file': [],
      'contents': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn() && localStorage.getItem('boardIndex')) {
      this.currentUser = this.authService.currentUser();
      var index = Number(localStorage.getItem('boardIndex'));
      this.postService
          .getPost(index)
          .subscribe((data) => {
            if(data.success) {
              this.post = data.result;
            }
          });
      localStorage.removeItem('boardIndex');
    } else {
      this.router.navigate(['/']);
    }
  }

  async postEdit(form: any) {
    if(form.title != "") this.post.boardTitle = form.title;
    if(form.maxNum != "") this.post.memberCount = Number(form.maxNum);
    if(form.file != "") this.post.file = form.file;
    if(form.contents != "") this.post.boardContent = form.contents;
    var res = confirm("수정을 완료하시겠습니까?");
    if(res) {
      const token: any = await this.authService.getToken();
      this.postService
          .updatePost(this.post, token)
          .subscribe(data => {
            if(data.success) {
              alert("수정이 완료되었습니다.");
              this.router.navigate(['recruitment/detail/'+data.result.boardIndex]);
            } else {
              alert("수정에 실패하였습니다.\n"+data.message);
            }
          });
    }
  }
}
