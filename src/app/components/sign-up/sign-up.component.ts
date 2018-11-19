import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = {
      name: '',
      email: '',
      password: '',
      major: '',
      grade: 1
  };
  signUpForm: FormGroup;

  constructor(fb: FormBuilder) { 
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
      name: form.name,
      email: form.email,
      password: form.pass,
      major: form.major,
      grade: form.grade
    };
    console.log(this.user);
    location.href="signin";
  }
}
