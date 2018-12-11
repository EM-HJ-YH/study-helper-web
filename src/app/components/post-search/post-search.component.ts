import { Component, OnInit, Input } from '@angular/core';

import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @Input() searchPost: Post[];

  constructor() { }

  ngOnInit() {
  }

}
