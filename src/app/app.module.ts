import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

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
    CafeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
