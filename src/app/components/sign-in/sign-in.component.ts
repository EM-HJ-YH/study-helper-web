import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private router: Router, fb: FormBuilder,
              private authService: AuthService) {
    this.signInForm = fb.group({
      'userId': [''],
      'userPw': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
  
  onLoginSubmit(form: any): void {
    if(form.userId == 'admin') {
      this.authService
          .adminLogin(form.userId, form.userPw)
          .subscribe(data => {
            if(data.success && data.result.token && data.result.isAdmin) {
              localStorage.setItem('token', data.result.token);
              localStorage.setItem('admin', data.result.isAdmin);
              this.router.navigate(['admin']);
            } else {
              alert("관리자 로그인에 실패하였습니다.\n"+data.message);
            }
          });
    } else {
      this.authService.login(form.userId, form.userPw)
          .subscribe(data => {
            if(data.success && data.result.token) {
              localStorage.setItem('token', data.result.token);
              localStorage.setItem('currentUser', JSON.stringify(data.result));
              this.router.navigate(['mypage']);
            } else {
              alert("로그인에 실패하였습니다.\n"+data.message);
            }
          });
    }
  }
}
