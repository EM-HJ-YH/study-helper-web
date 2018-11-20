import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://54.180.105.16:80/users';

  constructor(public http: Http) { }

  getUsers() {
    return this.http
            .get(this.usersUrl)
            .pipe(map( res => res.json() ));
  }

  getUser(id: string) {
    const url= `${this.usersUrl}/${id}`;
    return this.http
            .get(url)
            .pipe(map( res => res.json() ));
  }

  registerUser(user: User) {
    return this.http
            .post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
            .pipe(map( res => res.json() ));
  }

  deleteUser(id: string) {
    const url= `${this.usersUrl}/${id}`;
    return this.http
            .delete(url, {headers: this.headers})
            .pipe(map( () => null ));
  }

  updateUser(user: User) {
    const url= `${this.usersUrl}/${user.userId}`;
    return this.http
          .put(url, JSON.stringify(user), {headers: this.headers})
          .pipe(map( () => user ));
  }
}