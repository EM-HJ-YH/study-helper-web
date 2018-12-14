import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { CafeInfo, CafeBook } from 'src/app/models/cafe';

import { AuthService } from 'src/app/service/auth.service';
import { CafeInfoService } from 'src/app/service/cafe-info.service';
import { CafeBookService } from 'src/app/service/cafe-book.service';

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css']
})
export class MyBookComponent implements OnInit {
  currentUser: User;
  myBooks: CafeBook[];
  cafes: CafeInfo[];

  constructor(private authService: AuthService,
              private cafeInfoService: CafeInfoService,
              private cafeBookService: CafeBookService,
              private router: Router,) { }

  ngOnInit() {
    if(this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.currentUser = this.authService.currentUser();
      this.getCafeBooks();
      this.getCafes();
    } else {
      this.router.navigate(['/']);
    }
  }

  async getCafes() {
    const token: any = await this.authService.getToken();
    this.cafeInfoService
        .listCafe(token)
        .subscribe(data => {
          if(data.success) {
            this.cafes = data.result;
          } else {
            console.log(data.message);
          }
        });
  }

  async getCafeBooks() {
    const token: any = await this.authService.getToken();
    this.cafeBookService
        .listCafeBookByUserId(this.currentUser.userId, token)
        .subscribe(data => {
          if(data.success) {
            this.myBooks = data.result;
          } else console.log(data.message);
        });
  }

  findCafeName(cafeIndex: number): string {
    if(this.cafes==null) return '';
    else return this.cafes.find(x=>x.cafeIndex==cafeIndex).cafeName;
  }

  async deleteCafeBook(index: number) {
    var res = confirm("정말로 예약을 취소하시겠습니까?");
    if(res) {
      const token: any = await this.authService.getToken();
      this.cafeBookService
          .deleteCafeBook(index, token)
          .subscribe(data => {
            if(data.success) {
              alert('예약이 취소되었습니다.');
              this.ngOnInit();
            } else console.log(data.message);
          });
    }
  }
}
