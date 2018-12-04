import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  currentUser: User;
  editForm: FormGroup;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router, fb: FormBuilder) { 
    this.editForm = fb.group({
      'name': [''],
      'major': [''],
      'grade': []
    });
  }

  async ngOnInit() {
    if(this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.currentUser = this.authService.currentUser();
      const token: any = await this.authService.getToken();
      this.userService
          .getUser(this.currentUser.userId, token)
          .subscribe((user) => {
            this.currentUser = user.result;
          });
    } else {
      this.router.navigate(['signin']);
    }
  }

  async onSubmit(form: any) {
    var user: User = this.currentUser;
    if(form.name != "") user.userName = form.name;
    if(form.major != "") user.major = form.major;
    if(form.grade != null) user.admissionYear = form.grade;
    const token: any = await this.authService.getToken();
    this.userService
        .updateUser(user, token)
        .subscribe(data => {
          if(data.success) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('회원 정보를 수정하였습니다.');
            this.router.navigate(['mypage']);
          } else {
            alert(data.message);
          }
        });
  }
}
