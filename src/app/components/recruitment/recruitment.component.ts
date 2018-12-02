import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from '../../post';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  searchForm: FormGroup;
  allPost: Post[];
  currentUser: User;
  searchPost: Post[] = [];
  searchClicked: boolean;

  constructor(fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private postService: PostService,) {
    this.searchForm = fb.group({
      'searchTerm': [''],
      'searchText': ['']
    });
    this.searchClicked = false;
  }

  ngOnInit() {
    this.getPosts();
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
    }
  }
  
  getPosts() {
    this.postService
        .getPosts()
        .subscribe((posts)=>{
          this.allPost = posts.result;
        });
  }
    
  onSearch(form: any) {
    var txt = form.searchText;
    if(txt != "") {
      this.searchPost = [];
      if(form.searchTerm == "boardTitle") {
        for (var i=0; i<this.allPost.length; i++) {
          if(this.allPost[i].boardTitle.includes(txt)) {
            this.searchPost.push(this.allPost[i]);
          }
        }
      } else if(form.searchTerm == "userId") {
        for (var i=0; i<this.allPost.length; i++) {
          if(this.allPost[i].userId.includes(txt)) {
            this.searchPost.push(this.allPost[i]);
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

  onWrite() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['recruitment/postwrite']);
    } else {
      alert('글 작성은 로그인 후 할 수 있습니다.');
    }
  }
}
