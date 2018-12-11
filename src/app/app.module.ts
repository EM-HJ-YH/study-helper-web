import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { GroupPageComponent } from './components/group-page/group-page.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AdminComponent } from './components/admin/admin.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { CafeComponent } from './components/cafe/cafe.component';

import { UserService } from './user.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './auth.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostWriteComponent } from './components/post-write/post-write.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostService } from './post.service';
import { PostSearchComponent } from './components/post-search/post-search.component';
import { MyGroupListComponent } from './components/my-group-list/my-group-list.component';
import { GroupService } from './group.service';
import { GroupBoardWriteComponent } from './components/group-board-write/group-board-write.component';
import { GroupBoardDetailComponent } from './components/group-board-detail/group-board-detail.component';
import { GroupBoardService } from './group-board.service';
import { GroupBoardSearchComponent } from './components/group-board-search/group-board-search.component';
import { GroupBoardEditComponent } from './components/group-board-edit/group-board-edit.component';
import { ScheduleService } from './schedule.service';
import { ScheduleWriteComponent } from './components/calendar/schedule-write/schedule-write.component';
import { ScheduleYmComponent } from './components/calendar/schedule-ym/schedule-ym.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    MyPageComponent,
    GroupPageComponent,
    CalendarComponent,
    AdminComponent,
    RecruitmentComponent,
    CafeComponent,
    NavbarComponent,
    EditProfileComponent,
    PostDetailComponent,
    PostWriteComponent,
    PostEditComponent,
    PostSearchComponent,
    MyGroupListComponent,
    GroupBoardWriteComponent,
    GroupBoardDetailComponent,
    GroupBoardSearchComponent,
    GroupBoardEditComponent,
    ScheduleWriteComponent,
    ScheduleYmComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
