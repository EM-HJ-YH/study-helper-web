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
  countList: number = 5;
  totalPost: number = 0;
  totalPage: number = 0;
  countPage: number = 3;
  currentPage: number = 1;
  startPage: number = 1;
  endPage: number = 3;
  S: number = 0;
  E: number = 4;

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
          this.totalPost = this.allPost.length;
          this.totalPage = parseInt((this.totalPost / this.countList).toString());
          if (this.totalPost % this.countList > 0) {
            this.totalPage++;
          }
          this.startPage = ((this.currentPage-1)/this.countPage) * this.countPage + 1;
          this.startPage = parseInt(this.startPage.toString());
          if(this.startPage%this.countPage == 2) {
            this.startPage--;
          } else if(this.startPage%this.countPage == 0) {
            this.startPage -= 2;
          }
          this.endPage = this.startPage + this.countPage - 1;
          if (this.endPage > this.totalPage) {
            this.endPage = this.totalPage;
          }
          this.S = (this.currentPage-1) * this.countList;
          this.E = this.S + this.countList;
          if(this.E>this.totalPost) {
            this.E = this.totalPost;
          }
        });
  }
    
  onSearch(form: any) {
    var txt = form.searchText;
    if(txt != "") {
      this.searchPost = [];
      if(form.searchTerm == "") {
        alert('검색 조건을 선택하세요.');
        return;
      } else if(form.searchTerm == "boardTitle") {
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

  page(x: number) {
    this.currentPage = x;
    this.ngOnInit();
  }

  pre() {
    this.startPage -= 3;
    this.endPage = this.startPage + this.countPage - 1;
    if (this.endPage > this.totalPage) {
      this.endPage = this.totalPage;
    }
  }

  next() {
    this.startPage += 3;
    this.endPage = this.startPage + this.countPage - 1;
    if (this.endPage > this.totalPage) {
      this.endPage = this.totalPage;
    }
  }
}
