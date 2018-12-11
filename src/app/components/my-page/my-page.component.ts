import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../user';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.currentUser = this.authService.currentUser();
    } else {
      this.router.navigate(['/']);
    }
  }

  async deleteUser() {
    var res = confirm("탈퇴하셔도 작성된 게시물은 삭제되지 않습니다.\nStudy Helper를 탈퇴하시겠습니까?");
    if(res) {
      const token: any = await this.authService.getToken();
      this.userService
          .deleteUser(this.currentUser.userId, token)
          .subscribe(data => {
            if(data.success) {
              this.authService.logout();
              alert('회원 탈퇴가 완료되었습니다.');
              this.router.navigate(['signup']);
            }
          });
    }
  }
}
