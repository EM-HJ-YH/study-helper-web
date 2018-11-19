import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from 'src/app/user.service';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  posts: Post[];
  
  constructor(private userService: UserService) { }

  getUsers() {
    console.log("getUsers()");
    this.userService
        .getUsers()
        .subscribe((users)=>{
          console.log(users);  // for testing if works on console
          this.users = users;
        });
  }

  ngOnInit() {
    this.getUsers();
    console.log("users_get_test\n"+this.users);
  }

}
interface Post{
  id:number,
  title:string,
  body:string,
  userId:number
}