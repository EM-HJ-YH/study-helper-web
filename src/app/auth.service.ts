import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  login(userId: string, userPw: string) {
    const url= `${this.rootUrl}/signInUser`;
    return this.http.post(url, {userId, userPw})
            .pipe(map(res => res.json()));
  }

  isLoggedIn(): boolean {
    var token = localStorage.getItem('token');
    if(token) return true;
    else return false;
  }

  getToken(): string {
    var token = localStorage.getItem('token');
    if(token) return token;
  }

  currentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
}