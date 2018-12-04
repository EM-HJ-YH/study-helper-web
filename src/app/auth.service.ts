import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  login(userId: string, userPw: string) {
    const url= `${this.rootUrl}/signInUser`;
    return this.http.post(url, {userId, userPw})
            .pipe(map(res => res.json()));
  }

  adminLogin(adminId: string, adminPw: string) {
    const url= `${this.rootUrl}/signInAdmin`;
    return this.http.post(url, {adminId, adminPw})
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

  isAdmin(): boolean {
    if(this.isLoggedIn() && localStorage.getItem('admin')=='true')
      return true;
    else return false;
  }
  
  currentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  logout(): void {
    localStorage.clear();
  }
}