import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  signUpForm: FormGroup;

  constructor(private userService: UserService, private router: Router, fb: FormBuilder,
              private authService: AuthService,) { 
    this.signUpForm = fb.group({
      'name': [''],
      'email': [''],
      'pass': [''],
      'major': [''],
      'grade': []
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(form: any): void {
    if(form.name=="") {alert("이름을 입력해 주세요."); return;}
    else if(form.email=="") {alert("이메일을 입력해 주세요."); return;}
    else if(form.pass=="") {alert("비밀번호를 입력해 주세요."); return;}
    this.user = {
      userName: form.name,
      userId: form.email,
      userPw: form.pass,
      major: form.major,
      admissionYear: form.grade
    };

    this.userService.registerUser(this.user).subscribe(data => {
      if(data.success) {
        alert('가입에 성공하였습니다.');
        this.router.navigate(['signin']);
      } else {
        alert('가입에 실패하였습니다.');
      }
    })
  }
}
