import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { GroupBoard } from 'src/app/models/group';

import { AuthService } from 'src/app/service/auth.service';
import { GroupBoardService } from 'src/app/service/group-board.service';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-group-board-edit',
  templateUrl: './group-board-edit.component.html',
  styleUrls: ['./group-board-edit.component.css']
})
export class GroupBoardEditComponent implements OnInit {
  post: GroupBoard = {
    groupBoardIndex: 0,
    groupIndex: 0,
    groupName: '',
    groupBoardTitle: '',
    groupBoardPosterId: '',
    groupBoardDate: '',
    groupBoardContent: '',
  };
  postEditForm: FormGroup;
  currentUser: User;
  fileToUpload: File = null;

  constructor(fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private groupBoardService: GroupBoardService,
              private fileService: FileService) {
    this.postEditForm = fb.group({
      'title': [''],
      'contents': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.currentUser = this.authService.currentUser();
      this.getPost();
    } else {
      this.router.navigate(['/']);
    }
  }

  async getPost() {
    var index = Number(localStorage.getItem('groupBoardIndex'));
    const token: any = await this.authService.getToken();
    this.groupBoardService
        .getGroupBoardByIndex(index, token)
        .subscribe(data => {
          if(data.success) {
            this.post = data.result;
          } else console.log(data.message);
        });
  }

  handleFileInput(files: FileList) {
    if(files && files.length > 0) {
      this.fileToUpload = files.item(0);
      if(this.fileToUpload.type.includes('image')) {
        this.uploadFile();
      } else alert('이미지 파일만 업로드할 수 있습니다.');
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

  async postEdit(form: any) {
    if(form.title != "") this.post.groupBoardTitle = form.title;
    if(form.contents != "") this.post.groupBoardContent = form.contents;
    var res = confirm("수정을 완료하시겠습니까?");
    if(res) {
      const token: any = await this.authService.getToken();
      this.groupBoardService
          .updateGroupBoard(this.post, token)
          .subscribe(data => {
            if(data.success) {
              alert("수정이 완료되었습니다.");
              this.router.navigate(['mygroup/detail/'+data.result.groupBoardIndex]);
            } else {
              alert("수정에 실패하였습니다.\n"+data.message);
            }
          });
    }
  }
}
