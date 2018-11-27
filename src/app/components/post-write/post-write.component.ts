import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from 'src/app/post';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';

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
              private router: Router) {
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
      this.router.navigate(['signin']);
    }
  }

  postWrite(form: any) {
    this.post = {
      postNo: 0,
      title: form.title,
      writer: this.currentUser.userId,
      date: new Date().toString(),
      contents: form.contents,
      maxNum: Number(form.maxNum),
    }
    if(form.file) this.post.file = form.file;
    alert("제목: "+this.post.title+"\n모집 인원: "+this.post.maxNum+"\n내용: "+this.post.contents);
  }
}
