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
import { ChatComponent } from './components/chat/chat.component';
import { AdminComponent } from './components/admin/admin.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { NoticeComponent } from './components/notice/notice.component';
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

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    MyPageComponent,
    GroupPageComponent,
    CalendarComponent,
    ChatComponent,
    AdminComponent,
    RecruitmentComponent,
    NoticeComponent,
    CafeComponent,
    NavbarComponent,
    EditProfileComponent,
    PostDetailComponent,
    PostWriteComponent,
    PostEditComponent,
    PostSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [UserService, AuthService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
