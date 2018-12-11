import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { GroupBoard } from 'src/app/models/group';

@Injectable({
    providedIn: 'root'
})
export class GroupBoardService {

  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  createGroupBoard(board: GroupBoard, token: string) {
    const url= `${this.rootUrl}/groupBoards`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .post(url, JSON.stringify(board), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  listGroupBoard(token: string) {
    const url= `${this.rootUrl}/groupBoards`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  getGroupBoardByGroup(groupIndex: number, token: string) {
    const url= `${this.rootUrl}/groupBoards/group/${groupIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  getGroupBoardByIndex(boardIndex: number, token: string) {
    const url= `${this.rootUrl}/groupBoards/${boardIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  updateGroupBoard(board: GroupBoard, token: string) {
    const url= `${this.rootUrl}/groupBoards/${board.groupBoardIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .put(url, JSON.stringify(board), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  deleteGroupBoard(index: number, token: string) {
    const url= `${this.rootUrl}/groupBoards/${index}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .delete(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }
}