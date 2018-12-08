import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user';
import { ScheduleService } from 'src/app/schedule.service';
import { Group } from 'src/app/group';
import { Schedule } from 'src/app/schedule';

@Component({
  selector: 'app-schedule-write',
  templateUrl: './schedule-write.component.html',
  styleUrls: ['./schedule-write.component.css']
})
export class ScheduleWriteComponent implements OnInit {
  @Output() writingEnd = new EventEmitter<boolean>();
  @Input() myGroupList: Group[];
  currentUser: User;
  scheduleForm: FormGroup;

  constructor(private router: Router, fb: FormBuilder,
              private authService: AuthService,
              private scheduleService: ScheduleService,) {
    this.scheduleForm = fb.group({
      'date': [''],
      'content': [''],
      'groupName': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.currentUser = this.authService.currentUser();
    } else{
      this.router.navigate(['/']);
    }
  }

  async createSchedule(form: any) {
    if(form.date=="") {alert('날짜를 입력해주세요.'); return;}
    else if(form.content=="") {alert('내용을 입력해주세요.'); return;}
    else if(form.groupName=="") {alert('그룹을 선택해주세요.'); return;}
    var s: Schedule = {
      scheduleIndex: 0,
      scheduleYear: form.date.substring(0, 4),
      scheduleMonth: form.date.substring(5, 7),
      scheduleDay: form.date.substring(8),
      scheduleContent: form.content,
      groupIndex: this.myGroupList.find(x=>x.groupName==form.groupName).groupIndex,
      groupName: form.groupName,
      posterId: this.currentUser.userId,
    }
    var res = confirm('일정을 등록하시겠습니까?');
    if(res) {
      const token: any = await this.authService.getToken();
      this.scheduleService
          .createSchedule(s, token)
          .subscribe(data => {
            if(data.success) {
              alert('일정을 등록하였습니다.');
              this.writingEnd.emit(false);
            } else alert("일정 등록에 실패하였습니다.\n"+data.message);
          });
    }
  }
}
