import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  } from 'googlemaps';

import { User } from 'src/app/models/user';
import { CafeInfo } from 'src/app/models/cafe';

import { AuthService } from 'src/app/service/auth.service';
import { CafeInfoService } from 'src/app/service/cafe-info.service';

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.css']
})
export class CafeComponent implements OnInit {
  myMap: google.maps.Map;
  currentUser: User;
  cafes: CafeInfo[];

  constructor(private router: Router,
              private cafeInfoService: CafeInfoService,
              private authService: AuthService,) { }

  ngOnInit() {
    if(this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.currentUser = this.authService.currentUser();
      var mapProp = {
        center: new google.maps.LatLng(37.581753, 127.010360),
        zoom: 15,
      };
      this.myMap = new google.maps.Map(document.getElementById('map'), mapProp);
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
            this.addMarkers();
          } else {
            console.log(data.message);
          }
        });
  }

  addMarkers() {
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < this.cafes.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.cafes[i].latitude, this.cafes[i].longitude),
        title: this.cafes[i].cafeName,
        label: this.cafes[i].cafeIndex.toString(),
        map: this.myMap,
      });
      var bookButton = '<button id="book" type="buttton">예약</button>';

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(marker.title);
          infowindow.open(this.myMap, marker);
        }
      })(marker, i));
    }
  }

  booking(cafeIndex: number) {
    this.router.navigate(['cafebook/'+cafeIndex]);
  }
}
