import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from '../../post';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user';

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
              private authService: AuthService,) {
    this.postEditForm = fb.group({
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
      this.router.navigate(['signin']);
    }
  }

  postEdit(form: any) {
    if(form.title != "") this.post.boardTitle = form.title;
    if(form.maxNum != "") this.post.memberCount = Number(form.maxNum);
    if(form.file != "") this.post.file = form.file;
    if(form.contents != "") this.post.boardContent = form.contents;
  }
}
