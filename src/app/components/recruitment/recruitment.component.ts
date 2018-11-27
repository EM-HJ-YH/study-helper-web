import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from '../../post';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  searchForm: FormGroup;
  selectedPost: Post;
  allPost: Post[];
  isWriter: boolean;
  currentUser: User;

  constructor(fb: FormBuilder, private router: Router,
              private authService: AuthService,) {
    this.searchForm = fb.group({
      'searchTerm': [''],
      'searchText': ['']
    });
    this.isWriter = false;
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
    }
  }

  onSearch(form: any) {

  }

  onSelect(post: Post) {
    this.selectedPost = post;
    if(this.currentUser.userId == this.selectedPost.writer) {
      this.isWriter = true;
    } else {
      this.isWriter = false;
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
