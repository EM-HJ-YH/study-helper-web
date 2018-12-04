import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  getUsers(token: string) {
    const url= `${this.rootUrl}/users`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  getUser(id: string, token: string) {
    const url= `${this.rootUrl}/users/${id}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  registerUser(user: User) {
    const url= `${this.rootUrl}/users`;
    return this.http
            .post(url, JSON.stringify(user), {headers: this.headers})
            .pipe(map( res => res.json() ));
  }

  deleteUser(id: string, token: string) {
    const url= `${this.rootUrl}/users/${id}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .delete(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  updateUser(user: User, token: string) {
    const url= `${this.rootUrl}/users/${user.userId}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
          .put(url, JSON.stringify(user), {headers: headers})
          .pipe(map( res => res.json() ));
  }
}