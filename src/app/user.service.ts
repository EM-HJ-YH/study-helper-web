import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://54.180.105.16:80/users';

  constructor(public http: Http) { }

  getUsers() {
    return this.http.get(this.usersUrl).pipe(map(res => res.json()));
  }
}

// return this.http.get(this.usersUrl)
//            .toPromise()
//            .then(response => response.json().data as User[])
//            .catch(this.handleError);

// return this.http.get<User[]>(this.usersUrl);
// return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(map(res => res.json()));
   