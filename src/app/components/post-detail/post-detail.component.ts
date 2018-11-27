import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../post';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
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
  isWriter: boolean;
  isMember: boolean;
  currentUser: User;
  
  constructor(private router: Router,
              private authService: AuthService,
              private postService: PostService,) {
    this.isWriter = false;
    this.isMember = false;
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
    }
    this.getPost();
  }

  getPost() {
    var index = Number(this.router.url.substring(20));
    this.postService
        .getPost(index)
        .subscribe(data => {
          this.post = data.result;
          this.check();
        });
  }

  check() {
    if(this.currentUser) {
      if(this.currentUser.userId == this.post.userId) {
        this.isWriter = true;
      } else {
        this.isWriter = false;
      }
      if(this.post.members.includes(this.currentUser.userId)) {
        this.isMember = true;
      } else {
        this.isMember = false;
      }
    }
  }

  postEdit() {
    if(this.isWriter) {
      localStorage.setItem('boardIndex', this.post.boardIndex.toString());
      this.router.navigate(['recruitment/postedit']);
    }
  }

  postDelete() {
    if(this.authService.isLoggedIn() && this.isWriter) {
      var res = confirm("게시물을 삭제하시겠습니까?");
      if(res) {
        this.postService
            .deletePost(this.post.boardIndex, this.authService.getToken())
            .subscribe(data => {
              if(data.success) {
                this.router.navigate(['recruitment']);
              } else {
                alert("게시물 삭제에 실패하였습니다.\n"+data.message);
              }
            });
      }
    }
  }

}
