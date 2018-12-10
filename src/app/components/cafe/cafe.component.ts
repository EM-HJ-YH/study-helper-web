import { Component, OnInit } from '@angular/core';
import {  } from 'googlemaps';

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.css']
})
export class CafeComponent implements OnInit {
  myMap: google.maps.Map;
  hansung = new google.maps.LatLng(37.581753, 127.010360);

  constructor() { }

  ngOnInit() {
    var mapProp = {
      center: this.hansung,
      zoom: 15,
    };
    this.myMap = new google.maps.Map(document.getElementById('map'), mapProp);
    this.addMarkers();
  }

  addMarkers() {
    var locations = [
      [37.581753, 127.010360],
      [37.588830, 127.007407],
      [37.583906, 127.007983],
      [37.583651, 127.001939],
    ];
    var title = ['한성대학교', '카페 1', '카페 2', '카페 3',];

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][0], locations[i][1]),
        map: this.myMap
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(title[i]);
          infowindow.open(this.myMap, marker);
        }
      })(marker, i));
    }
  }
}
