import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { CafeInfo } from 'src/app/models/cafe';

@Injectable({
    providedIn: 'root'
})
export class CafeInfoService {

  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  createCafe(cafe: CafeInfo, token: string) {
    const url= `${this.rootUrl}/cafes`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .post(url, JSON.stringify(cafe), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  listCafe(token: string) {
    const url= `${this.rootUrl}/cafes`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  updateCafe(cafe: CafeInfo, token: string) {
    const url= `${this.rootUrl}/cafes/${cafe.cafeIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .put(url, JSON.stringify(cafe), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  deleteCafe(index: number, token: string) {
    const url= `${this.rootUrl}/cafes/${index}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .delete(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }
}