import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  signUpForm: FormGroup;

  constructor(private userService: UserService, fb: FormBuilder) { 
    this.signUpForm = fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'pass': ['', Validators.required],
      'major': [''],
      'grade': []
    });
  }

  ngOnInit() {
  }

  onSubmit(form: any): void {
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
        location.href="signin";
      } else {
        alert('가입에 실패하였습니다.');
      }
    })
  }
}
