import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {
  searchForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router,) {
    this.searchForm = fb.group({
      'searchTerm': ['', Validators.required],
      'searchText': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSearch(form: any) {

  }
}
