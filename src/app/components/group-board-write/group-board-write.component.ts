import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { GroupBoard } from 'src/app/models/group';

import { AuthService } from 'src/app/service/auth.service';
import { GroupBoardService } from 'src/app/service/group-board.service';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-group-board-write',
  templateUrl: './group-board-write.component.html',
  styleUrls: ['./group-board-write.component.css']
})
export class GroupBoardWriteComponent implements OnInit {
  postForm: FormGroup;
  currentUser: User;
  post: GroupBoard = {
    groupBoardIndex: 0,
    groupIndex: 0,
    groupName: '',
    groupBoardTitle: '',
    groupBoardPosterId: '',
    groupBoardDate: '',
    groupBoardContent: '',
    fileLocation: null,
  };
  currentGroupName: string;
  currentGroupIndex: number;
  fileToUpload: File = null;

  constructor(fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private groupBoardService: GroupBoardService,
              private fileService: FileService,) {
    this.postForm = fb.group({
      'title': [''],
      'contents': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn() && localStorage.getItem('groupName')) {
      this.currentUser = this.authService.currentUser();
      this.currentGroupName = localStorage.getItem('groupName');
      this.currentGroupIndex = Number(localStorage.getItem('groupIndex'));
    } else {
      this.router.navigate(['/']);
    }
  }

  handleFileInput(files: FileList) {
    if(files && files.length > 0) {
      this.fileToUpload = files.item(0);
      if(this.fileToUpload.type.includes('image')) {
        this.uploadFile();
      } else alert('이미지 파일만 업로드할 수 있습니다.');
    } else {
      this.post.fileLocation = null;
    }
  }

  async uploadFile() {
    const token: any = await this.authService.getToken();
    this.fileService
        .uploadFile(this.fileToUpload, token)
        .subscribe(data => {
          if(data.success) {
            this.post.fileLocation = data.result.location;
          } else console.log(data.message);
        });
  }

  async postWrite(form: any) {
    if(form.title=="") {alert('제목을 입력해주세요.'); return;}
    else if(form.contents=="") {alert('내용을 입력해주세요.'); return;}
    this.post = {
      groupBoardIndex: 0,
      groupIndex: this.currentGroupIndex,
      groupName: this.currentGroupName,
      groupBoardTitle: form.title,
      groupBoardPosterId: this.currentUser.userId,
      groupBoardDate: new Date().toString(),
      groupBoardContent: form.contents,
      fileLocation: this.post.fileLocation
    }
    var res = confirm("작성을 완료하시겠습니까?");
    if(res) {
      const token: any = await this.authService.getToken();
      this.groupBoardService
          .createGroupBoard(this.post, token)
          .subscribe(data => {
            if(data.success) {
              alert('게시글을 등록하였습니다.');
              this.router.navigate(['mygroup/detail/'+data.result.groupBoardIndex]);
            } else {
              alert('작성에 실패하였습니다.\n'+data.message);
            }
          });
    }
  }
}
