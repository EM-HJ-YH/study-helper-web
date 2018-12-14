import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyBookComponent } from './components/my-page/my-book/my-book.component';

import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { PostWriteComponent } from './components/post-write/post-write.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

import { MyGroupListComponent } from './components/my-group-list/my-group-list.component';
import { GroupPageComponent } from './components/group-page/group-page.component';
import { GroupBoardWriteComponent } from './components/group-board-write/group-board-write.component';
import { GroupBoardDetailComponent } from './components/group-board-detail/group-board-detail.component';
import { GroupBoardEditComponent } from './components/group-board-edit/group-board-edit.component';

import { CalendarComponent } from './components/calendar/calendar.component';

import { CafeComponent } from './components/cafe/cafe.component';
import { CafeBookComponent } from './components/cafe/cafe-book/cafe-book.component';

import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminGroupComponent } from './components/admin/admin-group/admin-group.component';
import { AdminCafeComponent } from './components/admin/admin-cafe/admin-cafe.component';
import { AdminCafeBookComponent } from './components/admin/admin-cafe-book/admin-cafe-book.component';

const routes: Routes = [
  { path: 'signup',  component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'mypage', component: MyPageComponent },
  { path: 'mypage/editprofile', component: EditProfileComponent },
  { path: 'mypage/mybook', component: MyBookComponent },
  { path: 'recruitment', component: RecruitmentComponent },
  { path: 'recruitment/postwrite', component: PostWriteComponent },
  { path: 'recruitment/postedit', component: PostEditComponent },
  { path: 'recruitment/detail/:index', component: PostDetailComponent },
  { path: 'mygrouplist', component: MyGroupListComponent },
  { path: 'mygroup', component: GroupPageComponent },
  { path: 'mygroup/groupboardwrite', component: GroupBoardWriteComponent},
  { path: 'mygroup/detail/:groupBoardIndex', component: GroupBoardDetailComponent },
  { path: 'mygroup/postedit', component: GroupBoardEditComponent },
  { path: 'schedule', component: CalendarComponent },
  { path: 'cafe', component: CafeComponent },
  { path: 'cafebook/:index', component: CafeBookComponent },
  { path: 'adminuser', component: AdminUserComponent },
  { path: 'admingroup', component: AdminGroupComponent },
  { path: 'admincafe', component: AdminCafeComponent },
  { path: 'admincafebook', component: AdminCafeBookComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}