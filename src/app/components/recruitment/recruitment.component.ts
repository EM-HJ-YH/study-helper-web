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

  constructor(fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private postService: PostService,) {
    this.searchForm = fb.group({
      'searchTerm': [''],
      'searchText': ['']
    });
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

  }

  onWrite() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['recruitment/postwrite']);
    } else {
      alert('글 작성은 로그인 후 할 수 있습니다.');
    }
  }
}
