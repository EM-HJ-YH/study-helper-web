import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Post, POSTS } from '../../post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post;
  postEditForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router,) {
    this.postEditForm = fb.group({
      'title': [''],
      'maxNum': [''],
      'file': [],
      'contents': [''],
    });
    this.post = POSTS[0];
  }

  ngOnInit() {
    if(localStorage.getItem('token')) {
      // this.currentUser = this.authService.currentUser();
    } else {
      this.router.navigate(['signin']);
    }
  }

  postEdit(form: any) {
    if(form.title != "") this.post.title = form.title;
    if(form.maxNum != "") this.post.maxNum = Number(form.maxNum);
    if(form.file != "") this.post.file = form.file;
    if(form.contents != "") this.post.contents = form.contents;
    alert("제목: "+this.post.title+"\n모집 인원: "+this.post.maxNum+"\n내용: "+this.post.contents);
  }
}
