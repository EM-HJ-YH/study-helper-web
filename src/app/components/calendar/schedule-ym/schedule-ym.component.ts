import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { Group } from 'src/app/models/group';
import { Schedule } from 'src/app/models/schedule';

import { AuthService } from 'src/app/service/auth.service';
import { ScheduleService } from 'src/app/service/schedule.service';

@Component({
  selector: 'app-schedule-ym',
  templateUrl: './schedule-ym.component.html',
  styleUrls: ['./schedule-ym.component.css']
})
export class ScheduleYmComponent implements OnInit {
  @Input() myGroupList: Group[];
  @Input() year: string;
  @Input() month: string;
  allSchedule: Schedule[] = [];
  currentUser: User;
  scheduleEditForm: FormGroup;
  editing: boolean = false;
  editingSchedule: Schedule;
  d: string;

  constructor(private router: Router, fb: FormBuilder,
              private authService: AuthService,
              private scheduleService: ScheduleService,) {
    this.scheduleEditForm = fb.group({
      'date': [''],
      'content': [''],
      'groupName': [''],
    });
  }

  ngOnChanges() {
    this.editing = false;
    this.ngOnInit();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
      this.getMyScheduleByYearMonth();
    }
  }

  async getMyScheduleByYearMonth() {
    const token: any = await this.authService.getToken();
    this.scheduleService.getMyScheduleByYearMonth(this.year, this.month, this.currentUser.userId, token)
        .subscribe(data => {
          if(data.success) {
            this.allSchedule = data.result;
          } else console.log(data.message);
        });
  }

  async deleteSchedule(scheduleIndex: number) {
    var res = confirm('일정을 삭제하시겠습니까?');
    if(res) {
      const token: any = await this.authService.getToken();
      this.scheduleService
          .deleteSchedule(scheduleIndex, token)
          .subscribe(data => {
            if(data.success){
              alert("일정이 삭제되었습니다.");
              this.ngOnInit();
            } else alert("일정 삭제에 실패하였습니다.\n"+data.message);
          });
    }
  }

  editingClick(s: Schedule) {
    this.editing = !this.editing;
    this.editingSchedule = s;
    this.d = this.editingSchedule.scheduleYear+"-"+
              this.editingSchedule.scheduleMonth+"-"+
              this.editingSchedule.scheduleDay;
  }

  async updateSchedule(form: any) {
    if(form.date != "") {
      this.editingSchedule.scheduleYear = form.date.substring(0, 4);
      this.editingSchedule.scheduleMonth = form.date.substring(5, 7);
      this.editingSchedule.scheduleDay = form.date.substring(8);
    }
    if(form.content != "") this.editingSchedule.scheduleContent = form.content;
    if(form.groupName != "") {
      this.editingSchedule.groupName = form.groupName;
      this.editingSchedule.groupIndex = this.myGroupList.find(x=>x.groupName==form.groupName).groupIndex;
    }
    var res = confirm("일정을 수정하시겠습니까?");
    if(res) {
      const token: any = await this.authService.getToken();
      this.scheduleService
          .updateSchedule(this.editingSchedule, token)
          .subscribe(data => {
            if(data.success){
              alert("수정이 완료되었습니다.");
              this.editing = false;
              this.ngOnInit();
            } else alert("일정 수정에 실패하였습니다.\n"+data.message);
          });
    }
  }
}
