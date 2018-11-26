import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this.currentUser = this.authService.currentUser();
      this.userService
          .getUser(this.currentUser.userId)
          .subscribe((user) => {
            this.currentUser = user.result;
          });
    } else {
      this.router.navigate(['signin']);
    }
  }

  onSubmit(form: any): void {
    var user: User = this.currentUser;
    if(form.name != "") user.userName = form.name;
    if(form.major != "") user.major = form.major;
    if(form.grade != null) user.admissionYear = form.grade;
    this.userService
        .updateUser(user)
        .subscribe(data => {
          console.log(data);
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
