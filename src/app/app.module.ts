import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostWriteComponent } from './components/post-write/post-write.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostSearchComponent } from './components/post-search/post-search.component';

import { MyGroupListComponent } from './components/my-group-list/my-group-list.component';
import { GroupPageComponent } from './components/group-page/group-page.component';
import { GroupBoardWriteComponent } from './components/group-board-write/group-board-write.component';
import { GroupBoardDetailComponent } from './components/group-board-detail/group-board-detail.component';
import { GroupBoardSearchComponent } from './components/group-board-search/group-board-search.component';
import { GroupBoardEditComponent } from './components/group-board-edit/group-board-edit.component';

import { CalendarComponent } from './components/calendar/calendar.component';
import { ScheduleWriteComponent } from './components/calendar/schedule-write/schedule-write.component';
import { ScheduleYmComponent } from './components/calendar/schedule-ym/schedule-ym.component';

import { CafeComponent } from './components/cafe/cafe.component';

import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';

import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { PostService } from './service/post.service';
import { GroupService } from './service/group.service';
import { GroupBoardService } from './service/group-board.service';
import { ScheduleService } from './service/schedule.service';
import { CafeInfoService } from './service/cafe-info.service';
import { CafeBookService } from './service/cafe-book.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    MyPageComponent,
    EditProfileComponent,
    RecruitmentComponent,
    PostDetailComponent,
    PostWriteComponent,
    PostEditComponent,
    PostSearchComponent,
    MyGroupListComponent,
    GroupPageComponent,
    GroupBoardWriteComponent,
    GroupBoardDetailComponent,
    GroupBoardSearchComponent,
    GroupBoardEditComponent,
    CalendarComponent,
    ScheduleWriteComponent,
    ScheduleYmComponent,
    CafeComponent,
    AdminUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AuthService,
    PostService,
    GroupService,
    GroupBoardService,
    ScheduleService,
    CafeInfoService,
    CafeBookService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
