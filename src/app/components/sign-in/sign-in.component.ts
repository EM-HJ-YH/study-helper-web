import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private router: Router, fb: FormBuilder) { 
    this.signInForm = fb.group({
      'userId': ['', Validators.required],
      'userPw': ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  
  onLoginSubmit(form: any): void {
    // form.userId+form.userPw;
    this.router.navigate(['mypage']);
  }
}
