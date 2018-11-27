import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
    providedIn: 'root'
})
export class PostService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  getPosts() {
    const url= `${this.rootUrl}/boards`;
    return this.http
            .get(url)
            .pipe(map( res => res.json() ));
  }

  getPost(index: number) {
    const url= `${this.rootUrl}/boards/${index}`;
    return this.http
            .get(url)
            .pipe(map( res => res.json() ));
  }

  registerPost(post: Post, token: string) {
    const url= `${this.rootUrl}/boards`;
    this.headers.append('x-access-token', token);
    return this.http
            .post(url, JSON.stringify(post), {headers: this.headers})
            .pipe(map( res => res.json() ));
  }

  deletePost(index: number, token: string) {
    const url= `${this.rootUrl}/boards/${index}`;
    this.headers.append('x-access-token', token);
    return this.http
            .delete(url, {headers: this.headers})
            .pipe(map( res => res.json() ));
  }

  updatePost(post: Post, token: string) {
    const url= `${this.rootUrl}/boards/${post.boardIndex}`;
    this.headers.append('x-access-token', token);
    return this.http
          .put(url, JSON.stringify(post), {headers: this.headers})
          .pipe(map( res => res.json() ));
  }

  addMember(index: number, memberId: string, token: string) {
    const url=`${this.rootUrl}/boards/addMember/${index}/${memberId}`;
    this.headers.append('x-access-token', token);
    return this.http
                .put(url, {headers: this.headers})
                .pipe(map( res => res.json() ));
  }

  removeMember(index: number, memberId: string, token: string) {
    const url=`${this.rootUrl}/boards/removeMember/${index}/${memberId}`;
    this.headers.append('x-access-token', token);
    return this.http
                .put(url, {headers: this.headers})
                .pipe(map( res => res.json() ));
  }
}