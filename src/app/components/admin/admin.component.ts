import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  
  constructor(private userService: UserService) { }

    // 유저 한 명 찾기
  // onSubmit(form: any): void {
  //   this.userService
  //       .getUser(form.email)
  //       .subscribe((user)=>{
  //         console.log(user);
  //         this.searchedUser = user;
  //       });
  // }

  getUsers() {
    this.userService
        .getUsers()
        .subscribe((users)=>{
          this.users = users.result;
        });
  }

  deleteUser(id: string) {
    this.userService
        .deleteUser(id).subscribe(() => this.ngOnInit());
  }

  // 유저 업데이트
  // updateUser(user: User) {
  //   user = {
  //     userName: "update Test",
  //     userId: user.userId,
  //     userPw: "string",
  //     major: "string",
  //     admissionYear: 0
  //   }
  //   this.userService
  //       .updateUser(user)
  //       .subscribe(() => location.reload());
  // }

  ngOnInit() {
    this.getUsers();
  }
}