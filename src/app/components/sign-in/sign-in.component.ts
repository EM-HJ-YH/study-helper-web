import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      'userId': ['', Validators.required],
      'userPw': ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  
  onLoginSubmit(form: any): void {
    this.authService.login(form.userId, form.userPw)
        .subscribe(data => {
          if(data.success && data.result.token) {
            localStorage.setItem('token', data.result.token);
            localStorage.setItem('currentUser', JSON.stringify(data.result));
            this.router.navigate(['mypage']);
          } else {
            alert(data.message);
          }
        });
  }
}
