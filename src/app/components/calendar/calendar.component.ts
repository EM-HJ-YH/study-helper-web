import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { Group } from 'src/app/models/group';

import { AuthService } from 'src/app/service/auth.service';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  month: string[] = ["01", "02", "03", "04", "05", "06",
                     "07", "08", "09", "10", "11", "12"];
  today: Date = new Date();
  currentYear: number = this.today.getFullYear();
  currentMonth: string = (this.today.getMonth()+1).toString();
  writing: boolean = false;
  currentUser: User;
  myGroupList: Group[];

  constructor(private router: Router,
              private authService: AuthService,
              private groupService: GroupService,) { }

  ngOnInit() {
    if(this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.currentUser = this.authService.currentUser();
      this.getGroups();
    } else{
      this.router.navigate(['/']);
    }
  }

  async getGroups() {
    const token: any = await this.authService.getToken();
    this.groupService
        .listMyGroup(this.currentUser.userId, token)
        .subscribe(data => {
          if(data.success) {
            this.myGroupList = data.result;
          } else {
            console.log(data.message);
          }
        });
  }

  writingEnd(obj) {
    this.writing = obj;
    this.ngOnInit();
  }

  pre() {
    this.currentYear--;
    this.currentMonth = "01";
  }

  next() {
    this.currentYear++;
    this.currentMonth = "01";
  }

  selectMonth(m: string) {
    this.writing = false;
    this.currentMonth = m;
  }
}
