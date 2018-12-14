import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CafeBook, CafeInfo } from 'src/app/models/cafe';

import { AuthService } from 'src/app/service/auth.service';
import { CafeBookService } from 'src/app/service/cafe-book.service';
import { CafeInfoService } from 'src/app/service/cafe-info.service';

@Component({
  selector: 'app-admin-cafe-book',
  templateUrl: './admin-cafe-book.component.html',
  styleUrls: ['./admin-cafe-book.component.css']
})
export class AdminCafeBookComponent implements OnInit {
  books: CafeBook[];
  cafes: CafeInfo[];
  cafeBookEditForm: FormGroup;
  editing: boolean = false;
  editingCafeBook: CafeBook;

  constructor(private authService: AuthService,
              private cafeBookService: CafeBookService,
              private cafeInfoService: CafeInfoService,
              private router: Router, fb: FormBuilder) {
    this.cafeBookEditForm = fb.group({
      'date': [''],
      'beginTime': [''],
      'endTime': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isAdmin()) {
      this.getCafeBooks();
      this.getCafes();
    } else {
      this.router.navigate(['/']);
    }
  }

  async getCafeBooks() {
    const token: any = await this.authService.getToken();
    this.cafeBookService
        .listCafeBook(token)
        .subscribe(data => {
          if(data.success) {
            this.books = data.result;
          } else console.log(data.message);
        });
  }

  async getCafes() {
    const token: any = await this.authService.getToken();
    this.cafeInfoService
        .listCafe(token)
        .subscribe(data => {
          if(data.success) {
            this.cafes = data.result;
          } else console.log(data.message);
        });
  }

  findCafeName(cafeIndex: number): string {
    if(this.cafes==null) return '';
    else return this.cafes.find(x=>x.cafeIndex==cafeIndex).cafeName;
  }

  async deleteCafeBook(index: number) {
    const token: any = await this.authService.getToken();
    this.cafeBookService
        .deleteCafeBook(index, token)
        .subscribe(data => {
          if(data.success) {
            this.ngOnInit();
          } else console.log(data.message);
        });
  }

  editClick(c: CafeBook) {
    this.editing = !this.editing;
    this.editingCafeBook = c;
  }

  async updateCafeBook(form: any) {
    if(form.date!="") this.editingCafeBook.cafeBookDate = form.date;
    if(form.beginTime!="") this.editingCafeBook.cafeBookBeginTime = form.beginTime;
    if(form.endTime!="") this.editingCafeBook.cafeBookEndTime = form.endTime;
    var res = confirm('수정하시겠습니까?');
    if(res) {
      const token: any = await this.authService.getToken();
      this.cafeBookService
          .updateCafeBook(this.editingCafeBook, token)
          .subscribe(data => {
            if(data.success) {
              alert('예약 시간을 변경하였습니다.');
              this.editing = false;
              this.ngOnInit();
            } else alert("예약 시간 변경에 실패하였습니다.\n"+data.message);
          });
    }
  }
}
