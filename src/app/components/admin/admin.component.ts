import { Component, OnInit } from '@angular/core';
import { User } from '../../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [
    { name: 'name 1', email: 'email 1', password: 'password 1', major: 'major 1', grade: 1 },
    { name: 'name 2', email: 'email 2', password: 'password 2', major: 'major 2', grade: 2 },
    { name: 'name 3', email: 'email 3', password: 'password 3', major: 'major 3', grade: 3 }
  ]

  constructor() { }

  ngOnInit() {
  }

}
