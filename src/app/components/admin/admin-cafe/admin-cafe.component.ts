import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CafeInfo } from 'src/app/models/cafe';

import { AuthService } from 'src/app/service/auth.service';
import { CafeInfoService } from 'src/app/service/cafe-info.service';

@Component({
  selector: 'app-admin-cafe',
  templateUrl: './admin-cafe.component.html',
  styleUrls: ['./admin-cafe.component.css']
})
export class AdminCafeComponent implements OnInit {
  cafes: CafeInfo[];
  cafeInfoForm: FormGroup;
  cafeInfoEditForm: FormGroup;
  editing: boolean = false;
  editingCafe: CafeInfo;

  constructor(private authService: AuthService,
              private cafeInfoService: CafeInfoService,
              private router: Router, fb: FormBuilder) {
    this.cafeInfoForm = fb.group({
      'latitude': [''],
      'longitude': [''],
      'cafeName': [''],
      'cafePhone': [''],
    });
    this.cafeInfoEditForm = fb.group({
      'latitude': [''],
      'longitude': [''],
      'cafeName': [''],
      'cafePhone': [''],
    });
  }

  ngOnInit() {
    if(this.authService.isAdmin()) {
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

  async deleteCafe(index: number) {
    const token: any = await this.authService.getToken();
    this.cafeInfoService
        .deleteCafe(index, token).subscribe(() => this.ngOnInit());
  }

  async createCafeInfo(form: any) {
    if(form.latitude=="") {alert('위도를 입력해주세요.'); return;}
    else if(form.longitude=="") {alert('경도를 입력해주세요.'); return;}
    else if(form.cafeName=="") {alert('카페 이름을 입력해주세요.'); return;}
    var cafe: CafeInfo = {
      cafeIndex: 0,
      cafeName: form.cafeName,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude)
    }
    if(form.cafePhone != "") cafe.cafePhone = form.cafePhone;
    var res = confirm('카페를 등록하시겠습니까?');
    if(res) {
      const token: any = await this.authService.getToken();
      this.cafeInfoService
          .createCafe(cafe, token)
          .subscribe(data => {
            if(data.success) {
              alert('카페를 등록하였습니다.');
              this.ngOnInit();
            } else alert("카페 등록에 실패하였습니다.\n"+data.message);
          });
    }
  }

  editClick(c: CafeInfo) {
    this.editing = !this.editing;
    this.editingCafe = c;
  }

  async updateCafeInfo(form: any) {
    if(form.latitude!="") this.editingCafe.latitude = Number(form.latitude);
    if(form.longitude!="") this.editingCafe.longitude = Number(form.longitude);
    if(form.cafeName!="") this.editingCafe.cafeName = form.cafeName;
    if(form.cafePhone!="") this.editingCafe.cafePhone = form.cafePhone;
    var res = confirm('수정하시겠습니까?');
    if(res) {
      const token: any = await this.authService.getToken();
      this.cafeInfoService
          .updateCafe(this.editingCafe, token)
          .subscribe(data => {
            if(data.success) {
              alert('정보를 수정하였습니다.');
              this.editing = false;
              this.ngOnInit();
            } else alert("정보 수정에 실패하였습니다.\n"+data.message);
          });
    }
  }
}
