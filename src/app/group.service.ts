import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { User } from './user';
import { map } from 'rxjs/operators';
import { Group } from './group';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  createGroup(group: Group, token: string) {
    const url= `${this.rootUrl}/groups`;
    this.headers.append('x-access-token', token);
    return this.http
            .post(url, JSON.stringify(group), {headers: this.headers})
            .pipe(map( res => res.json() ));
  }

}