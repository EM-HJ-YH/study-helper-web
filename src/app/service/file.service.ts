import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileService {

  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  uploadFile(file: File, token: string) {
    const url= `${this.rootUrl}/file/upload`;
    const headers = new Headers();
    headers.append('x-access-token', token);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http
            .post(url, formData, {headers: headers})
            .pipe(map( res => res.json() ));
  }
}