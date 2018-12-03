import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { GroupPageComponent } from './components/group-page/group-page.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChatComponent } from './components/chat/chat.component';
import { NoticeComponent } from './components/notice/notice.component';
import { AdminComponent } from './components/admin/admin.component';
import { CafeComponent } from './components/cafe/cafe.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PostWriteComponent } from './components/post-write/post-write.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { MyGroupListComponent } from './components/my-group-list/my-group-list.component';

const routes: Routes = [
  { path: 'signup',  component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'mypage', component: MyPageComponent },
  { path: 'recruitment', component: RecruitmentComponent },
  { path: 'recruitment/detail/:index', component: PostDetailComponent },
  { path: 'mygrouplist', component: MyGroupListComponent },
  { path: 'mygroup/:index', component: GroupPageComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'mypage/notice', component: NoticeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cafe', component: CafeComponent },
  { path: 'mypage/editprofile', component: EditProfileComponent },
  { path: 'recruitment/postwrite', component: PostWriteComponent },
  { path: 'recruitment/postedit', component: PostEditComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}