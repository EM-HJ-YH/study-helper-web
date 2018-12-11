import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { CafeBook } from 'src/app/cafe';

@Injectable({
    providedIn: 'root'
})
export class CafeBookService {

  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  createCafeBook(book: CafeBook, token: string) {
    const url= `${this.rootUrl}/cafeBooks`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .post(url, JSON.stringify(book), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  listCafeBook(token: string) {
    const url= `${this.rootUrl}/cafeBooks`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  listCafeBookByUserId(userId: string, token: string) {
    const url= `${this.rootUrl}/cafeBooks/UserId/${userId}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  listCafeBookByCafe(cafeIndex: number, token: string) {
    const url= `${this.rootUrl}/cafeBooks/cafe/${cafeIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  updateCafeBook(book: CafeBook, token: string) {
    const url= `${this.rootUrl}/cafeBooks/${book.cafeBookIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .put(url, JSON.stringify(book), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  deleteCafeBook(index: number, token: string) {
    const url= `${this.rootUrl}/cafeBooks/${index}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .delete(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }
}