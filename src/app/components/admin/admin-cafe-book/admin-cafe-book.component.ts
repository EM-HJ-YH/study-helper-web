import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CafeBook } from 'src/app/models/cafe';

import { AuthService } from 'src/app/service/auth.service';
import { CafeBookService } from 'src/app/service/cafe-book.service';

@Component({
  selector: 'app-admin-cafe-book',
  templateUrl: './admin-cafe-book.component.html',
  styleUrls: ['./admin-cafe-book.component.css']
})
export class AdminCafeBookComponent implements OnInit {
  books: CafeBook[];

  constructor(private authService: AuthService,
              private cafeBookService: CafeBookService,
              private router: Router,) { }

  ngOnInit() {
    if(this.authService.isAdmin()) {
      this.getCafeBooks();
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
}
