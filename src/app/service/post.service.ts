import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { Post } from 'src/app/models/post';

@Injectable({
    providedIn: 'root'
})
export class PostService {

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
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .post(url, JSON.stringify(post), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  deletePost(index: number, token: string) {
    const url= `${this.rootUrl}/boards/${index}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .delete(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  updatePost(post: Post, token: string) {
    const url= `${this.rootUrl}/boards/${post.boardIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
          .put(url, JSON.stringify(post), {headers: headers})
          .pipe(map( res => res.json() ));
  }

  addMember(index: number, memberId: string, token: string) {
    const url=`${this.rootUrl}/boards/addMember/${index}/${memberId}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    let temp: any = {dummy: 10};
    return this.http
                .put(url, JSON.stringify(temp), {headers: headers})
                .pipe(map( res => res.json() ));
  }


  removeMember(index: number, memberId: string, token: string) {
    const url=`${this.rootUrl}/boards/removeMember/${index}/${memberId}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    let temp: any = {dummy: 10};
    return this.http
                .put(url, JSON.stringify(temp), {headers: headers})
                .pipe(map( res => res.json() ));
  }
}