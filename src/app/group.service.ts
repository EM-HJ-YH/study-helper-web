import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Group } from './group';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  createGroup(group: Group, token: string) {
    const url= `${this.rootUrl}/groups`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .post(url, JSON.stringify(group), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  listGroup(token: string) {
    const url= `${this.rootUrl}/groups`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  listMyGroup(userId: string, token: string) {
    const url= `${this.rootUrl}/groups/myGroup/${userId}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  updateGroup(group: Group, token: string) {
    const url= `${this.rootUrl}/groups/${group.groupIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .put(url, JSON.stringify(group), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  deleteGroup(index: number, token: string) {
    const url= `${this.rootUrl}/groups/${index}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .delete(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  removeMember(index: number, memberId: string, token: string) {
    const url= `${this.rootUrl}/groups/removeMember/${index}/${memberId}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    let temp: any = {dummy: 10};
    return this.http
            .put(url, JSON.stringify(temp), {headers: headers})
            .pipe(map( res => res.json() ));
  }
}