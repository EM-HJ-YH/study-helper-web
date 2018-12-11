import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from 'src/app/models/group';

import { AuthService } from 'src/app/service/auth.service';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {
  groups: Group[];

  constructor(private authService: AuthService,
              private groupService: GroupService,
              private router: Router) { }

  ngOnInit() {
    if(this.authService.isAdmin()) {
      this.getGroups();
    } else {
      this.router.navigate(['/']);
    }
  }

  async getGroups() {
    const token: any = await this.authService.getToken();
    this.groupService
        .listGroup(token)
        .subscribe(data => {
          if(data.success) {
            this.groups = data.result;
          } else {
            console.log(data.message);
          }
        });
  }

  async deleteGroup(index: number) {
    const token: any = await this.authService.getToken();
    this.groupService
        .deleteGroup(index, token).subscribe(() => this.ngOnInit());
  }
}
