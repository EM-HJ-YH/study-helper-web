import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';
import { Group } from 'src/app/models/group';

import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';
import { GroupService } from 'src/app/service/group.service';

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
              private postService: PostService,
              private groupService: GroupService,) {
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

  async postDelete() {
    if(this.authService.isLoggedIn() && this.isWriter) {
      var res = confirm("게시물을 삭제하시겠습니까?");
      if(res) {
        const token: any = await this.authService.getToken();
        this.postService
            .deletePost(this.post.boardIndex, token)
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

  async recruitingEnd() {
    if(this.authService.isLoggedIn() && this.isWriter) {
      var name = prompt("**모집을 마감하시면 글을 수정할 수 없습니다.**\n생성하실 그룹 이름을 입력해 주세요.");
      if(name == "") {
        alert("그룹 이름을 입력해 주세요!");
      } else if(name != "" && name != null) {
        const token: any = await this.authService.getToken();
        this.post.isRecruiting = false;
        this.post.boardTitle = "<<마감>>";
        this.postService
            .updatePost(this.post, token)
            .subscribe(data => {
              if(data.success) {
                let group: Group = {
                  groupIndex: 0,
                  groupMasterId: this.currentUser.userId,
                  groupName: name,
                  members: this.post.members
                };
                this.groupService
                    .createGroup(group, token)
                    .subscribe(data => {
                      if(data.success) alert("그룹: "+name+"를 생성하였습니다.");
                      else alert('그룹 생성에 실패하였습니다.\n'+data.message);
                    });
              } else {
                alert("모집 마감에 실패하였습니다.\n"+data.message);
              }
            });
      }
    }
  }

  async memberIn() {
    if(!this.authService.isLoggedIn()) {
      alert("팀 신청은 로그인 후 할 수 있습니다.")
    } else if(!this.isWriter) {
      var res = confirm("이 팀에 가입을 신청하시겠습니까?");
      if(res) {
        const token: any = await this.authService.getToken();
        this.postService
            .addMember(this.post.boardIndex, this.currentUser.userId, token)
            .subscribe(data => {
              if(data.success) {
                this.ngOnInit();
                alert("가입 신청이 완료되었습니다.");
              } else {
                alert("가입 신청이 실패했습니다.\n"+data.message);
              }
            });
      }
    }
  }

  async memberOut() {
    if(!this.authService.isLoggedIn()) {
      alert("팀 신청 취소는 로그인 후 할 수 있습니다.")
    } else if(!this.isWriter && this.isMember) {
      var res = confirm("이 팀에 가입을 취소하시겠습니까?");
      if(res) {
        const token: any = await this.authService.getToken();
        this.postService
            .removeMember(this.post.boardIndex, this.currentUser.userId, token)
            .subscribe(data => {
              if(data.success) {
                alert("팀 신청 취소가 완료되었습니다.");
                this.ngOnInit();
              } else {
                alert("팀 신청 취소가 실패했습니다.\n"+data.message);
              }
            });
      }
    }
  }
}
