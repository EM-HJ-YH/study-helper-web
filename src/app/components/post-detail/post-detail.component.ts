import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  @Input() isWriter: boolean;
  
  constructor(private router: Router,) { }

  ngOnInit() {
  }

  postEdit() {
    if(this.isWriter) {
      this.router.navigate(['recruitment/postedit']);
    }
  }
}
