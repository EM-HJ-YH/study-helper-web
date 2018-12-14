import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { CafeInfo, CafeBook } from 'src/app/models/cafe';

import { AuthService } from 'src/app/service/auth.service';
import { CafeInfoService } from 'src/app/service/cafe-info.service';
import { CafeBookService } from 'src/app/service/cafe-book.service';

@Component({
  selector: 'app-cafe-book',
  templateUrl: './cafe-book.component.html',
  styleUrls: ['./cafe-book.component.css']
})
export class CafeBookComponent implements OnInit {
  currentUser: User;
  cafeIndex: number;
  cafeName: string;
  cafeBookForm: FormGroup;

  constructor(private router: Router, fb: FormBuilder,
              private cafeInfoService: CafeInfoService,
              private cafeBookService: CafeBookService,
              private authService: AuthService,) {
    this.cafeBookForm = fb.group({
      'date': [''],
      'beginTime': [''],
      'endTime': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.currentUser = this.authService.currentUser();
      this.getCafes();
    } else {
      this.router.navigate(['/']);
    }
  }

  async getCafes() {
    this.cafeIndex = Number(this.router.url.substring(10));
    const token: any = await this.authService.getToken();
    this.cafeInfoService
        .listCafe(token)
        .subscribe(data => {
          if(data.success) {
            var cafes: CafeInfo[] = data.result;
            this.cafeName = cafes.find(x=>x.cafeIndex==this.cafeIndex).cafeName;
          } else {
            console.log(data.message);
          }
        });
  }

  async createCafeBook(form: any) {
    if(form.date=="") {alert('예약 날짜를 입력해주세요.'); return;}
    else if(form.beginTime=="") {alert('예약 시작 시간을 입력해주세요.'); return;}
    else if(form.endTime=="") {alert('예약 종료 시간을 입력해주세요.'); return;}
    if(form.beginTime>form.endTime) {alert('종료 시간은 시작 시간보다 나중이어야 합니다.'); return;}
    var book: CafeBook = {
      cafeBookIndex: 0,
      cafeIndex: this.cafeIndex,
      cafeBookUserId: this.currentUser.userId,
      cafeBookDate: form.date,
      cafeBookBeginTime: form.beginTime,
      cafeBookEndTime: form.endTime,
    }
    var res = confirm('이대로 예약하시겠습니까?');
    if(res) {
      const token: any = await this.authService.getToken();
      this.cafeBookService
          .createCafeBook(book, token)
          .subscribe(data => {
            if(data.success) {
              alert(this.cafeName+' 예약을 성공하였습니다.');
              this.router.navigate(['mypage/mybook']);
            } else alert("예약에 실패하였습니다.\n"+data.message);
          });
    }
  }
}
