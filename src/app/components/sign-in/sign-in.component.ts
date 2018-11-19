import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    major: '',
    grade: 1
  };
  signInForm: FormGroup;

  constructor(fb: FormBuilder) { 
    this.signInForm = fb.group({
      'email': ['', Validators.required],
      'pass': ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  
  onSubmit(form: any): void {
    console.log(form.email+form.pass);
    location.href="mypage";
  }
}
