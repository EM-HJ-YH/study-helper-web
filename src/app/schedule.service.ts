import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { Schedule } from './schedule';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

  private rootUrl = 'http://54.180.105.16:80';

  constructor(public http: Http) { }

  createSchedule(schedule: Schedule, token: string) {
    const url = `${this.rootUrl}/schedules`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .post(url, JSON.stringify(schedule), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  listSchedule(token: string) {
    const url = `${this.rootUrl}/schedules`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  updateSchedule(schedule: Schedule, token: string) {
    const url = `${this.rootUrl}/schedules/${schedule.scheduleIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .put(url, JSON.stringify(schedule), {headers: headers})
            .pipe(map( res => res.json() ));
  }

  deleteSchedule(scheduleIndex: number, token: string) {
    const url = `${this.rootUrl}/schedules/${scheduleIndex}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .delete(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }

  getMyScheduleByYearMonth(y: string, m: string, id: string, token: string) {
    const url = `${this.rootUrl}/schedules/${y}/${m}/${id}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('x-access-token', token);
    return this.http
            .get(url, {headers: headers})
            .pipe(map( res => res.json() ));
  }
}