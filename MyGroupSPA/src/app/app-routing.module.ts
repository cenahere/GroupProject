import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './members-components/messages/messages.component';
import { MembersComponent } from './members-components/members/members.component';
import { HomeComponent } from './auth-components/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailsComponent } from './members-components/member-details/member-details.component';
import { MemberListResolver } from './_resolvers/member-list-resolver';
import { MemeberDetailResolver } from './_resolvers/member-details-resolver';
import { MemberEditComponent } from './members-components/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit-resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MessageResolver } from './_resolvers/message-resolver';
import { PaymentComponent } from './members-components/payment/payment.component';
import { AdminPanelComponent } from './adminComponents/admin-panel/admin-panel.component';
import { UserClassShowstudentsComponent } from './adminComponents/user-class/user-class-showstudents/user-class-showstudents.component';
import { UserClassShowStudentResolver } from './_resolvers/user-class-showstuden.resolvert';
import { UserGroupShowStudentResolver } from './_resolvers/user-group-showstuden.resolvert';
import { UserGroupShowstudentComponent } from './adminComponents/user-group/user-group-showstudent/user-group-showstudent.component';
import { UserToAdminResolver } from './_resolvers/user-to-admin-resolver';
import { UserToAdminComponent } from './adminComponents/user-to-admin/user-to-admin/user-to-admin.component';
import { UserDetailsToAdminComponent } from './adminComponents/user-to-admin/user-to-admin/user-details-to-admin/user-details-to-admin.component';
import { UserToAdminDetailsResolver } from './_resolvers/user-to-admin-details-resolver ';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MembersComponent ,resolve:{users:MemberListResolver} },
      { path:'members/edit' , component:MemberEditComponent , resolve:{user:MemberEditResolver} , canDeactivate:[PreventUnsavedChangesGuard]},
      { path : 'members/:id' , component : MemberDetailsComponent , resolve:{user:MemeberDetailResolver}},
      {path:'messages',component:MessagesComponent,resolve:{messages:MessageResolver}},
      {path:'charge',component:PaymentComponent},

      {path:'userToAdmin',component:AdminPanelComponent , data:{ roles:['Admin','VIP']}, resolve:{usersToAdmin:UserToAdminResolver } },
      { path : 'userToAdmin/:id' , component : UserDetailsToAdminComponent,resolve:{userToAdmin:UserToAdminDetailsResolver} },
      {path:'userclass/:userClassId',component:UserClassShowstudentsComponent , resolve:{userclass:UserClassShowStudentResolver} },
      {path:'userclass/userGroup/:userGroupId' , component:UserGroupShowstudentComponent , resolve:{userGroup:UserGroupShowStudentResolver} }

     ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
