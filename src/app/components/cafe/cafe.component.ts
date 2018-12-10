import { Component, OnInit } from '@angular/core';
import {  } from 'googlemaps';

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.css']
})
export class CafeComponent implements OnInit {
  map: google.maps.Map;
  hansung = new google.maps.LatLng(37.581753, 127.010360);

  constructor() { }

  ngOnInit() {
    var mapProp = {
      center: this.hansung,
      zoom: 15,
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapProp);

    var marker = new google.maps.Marker({
      position: this.hansung,
      title: "한성대학교",
      map: this.map
    });
  }

}
