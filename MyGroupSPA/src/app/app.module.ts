import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './auth-components/home/home.component';
import { NavComponent } from './auth-components/nav/nav.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './_services/alertify.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthService } from './_services/auth.service';
import { NgxBootstrapModule } from './_modules/ngx-bootstrap/ngx-bootstrap.module';
import { MembersComponent } from './members-components/members/members.component';
import { MessagesComponent } from './members-components/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberCardComponent } from './members-components/member-card/member-card.component';
import { MemberDetailsComponent } from './members-components/member-details/member-details.component';
import { MemberListResolver } from './_resolvers/member-list-resolver';
import { MemeberDetailResolver } from './_resolvers/member-details-resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// import * as Hammer from 'hammerjs';
import { MemberEditComponent } from './members-components/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit-resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members-components/photo-editor/photo-editor.component';
// import {TimeAgoPipe} from 'time-ago-pipe';

import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from './_timeAgoPip/timeAgoPipe';
import { MessageResolver } from './_resolvers/message-resolver';
import { MemberMessagesComponent } from './members-components/member-messages/member-messages.component';
import { PaymentComponent } from './members-components/payment/payment.component';
import { HasRoleDirective } from './_driectives/has-role.directive';
import { AdminPanelComponent } from './adminComponents/admin-panel/admin-panel.component';
import { PaymentUsersComponent } from './adminComponents/payment-users/payment-users.component';
import { PaymentUsersResolver } from './_resolvers/payment-users-resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './_modules/angular-material/angular-material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { CityComponent } from './adminComponents/user-address/city/city/city.component';
import { UserAddressComponent } from './adminComponents/user-address/user-address/user-address.component';
import { UserClassComponent } from './adminComponents/user-class/user-class.component';
import { InsertUserClassComponent } from './adminComponents/user-class/insert-user-class/insert-user-class.component';
import { UpdateUserClassComponent } from './adminComponents/user-class/update-user-class/update-user-class.component';
import { VillageComponent } from './adminComponents/user-address/village/village.component';
import { GovernorateComponent } from './adminComponents/user-address/governorate/governorate.component';
import { CountryComponent } from './adminComponents/user-address/country/country.component';
import { UserToAdminComponent } from './adminComponents/user-to-admin/user-to-admin/user-to-admin.component';
import { UserToAdminUpdateComponent } from './adminComponents/user-to-admin/user-to-admin-update/user-to-admin-update.component';
import { UserToAdminCreateComponent } from './adminComponents/user-to-admin/user-to-admin-create/user-to-admin-create.component';
import { UserClassShowstudentsComponent } from './adminComponents/user-class/user-class-showstudents/user-class-showstudents.component';
import { UserClassShowStudentResolver } from './_resolvers/user-class-showstuden.resolvert';
import { UserGroupComponent } from './adminComponents/user-group/user-group.component';
import { UserGroupShowstudentComponent } from './adminComponents/user-group/user-group-showstudent/user-group-showstudent.component';
import { UserGroupShowStudentResolver } from './_resolvers/user-group-showstuden.resolvert';
import { AddUserAttendComponent } from './adminComponents/userAttend/add-user-attend/add-user-attend.component';
import { UserToAdminResolver } from './_resolvers/user-to-admin-resolver';
import { AddUserExamComponent } from './adminComponents/user-exam/add-user-exam/add-user-exam.component';
import { AddUserPayComponent } from './adminComponents/user-pay/add-user-pay/add-user-pay.component';
import { AllUsersComponent } from './adminComponents/user-to-admin/all-users/all-users.component';
import { RolesModalComponent } from './adminComponents/user-to-admin/roles-modal/roles-modal.component';
import { AddUserGroupToClassComponent } from './adminComponents/user-group/add-user-group-to-class/add-user-group-to-class.component';
import { UserDetailsToAdminComponent } from './adminComponents/user-to-admin/user-to-admin/user-details-to-admin/user-details-to-admin.component';
import { UserAttendToAdminComponent } from './adminComponents/user-to-admin/user-to-admin/user-attend-to-admin/user-attend-to-admin.component';
import { UserToAdminDetailsResolver } from './_resolvers/user-to-admin-details-resolver ';
import { UserAttendToUpdateComponent } from './adminComponents/user-to-admin/user-to-admin/user-attend-to-update/user-attend-to-update.component';
import { UserExamToAdminComponent } from './adminComponents/user-to-admin/user-to-admin/user-exam-to-admin/user-exam-to-admin.component';
import { UserExamToUpdateComponent } from './adminComponents/user-to-admin/user-to-admin/user-exam-to-update/user-exam-to-update.component';
import { UserPayToAdminComponent } from './adminComponents/user-to-admin/user-to-admin/user-pay-to-admin/user-pay-to-admin.component';
import { UserPayToUpdateComponent } from './adminComponents/user-to-admin/user-to-admin/user-pay-to-update/user-pay-to-update.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

// /* Custom Hammer configuration */
// export class CustomHammerConfig extends HammerGestureConfig {
//   overrides = {
//     'pan': {
//       direction: Hammer.DIRECTION_ALL,
//     }
//   }
// }
// /* End Custom hammer configuration */


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    MembersComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    // TimeAgoPipe
    TimeAgoPipe,
    MemberMessagesComponent,
    PaymentComponent,
    HasRoleDirective,
    AdminPanelComponent,
    PaymentUsersComponent,
    CityComponent,
    UserAddressComponent,
    UserClassComponent,
    InsertUserClassComponent,
    UpdateUserClassComponent,
    VillageComponent,
    GovernorateComponent,
    CountryComponent,
    UserToAdminComponent,
    UserToAdminUpdateComponent,
    UserToAdminCreateComponent,
    UserClassShowstudentsComponent,
    UserGroupComponent,
    UserGroupShowstudentComponent,
    AddUserAttendComponent,
    AddUserExamComponent,
    AddUserPayComponent,
    AllUsersComponent,
    RolesModalComponent,
    AddUserGroupToClassComponent,
    UserDetailsToAdminComponent,
    UserAttendToAdminComponent,
    UserAttendToUpdateComponent,
    UserExamToAdminComponent,
    UserExamToUpdateComponent,
    UserPayToAdminComponent,
    UserPayToUpdateComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxBootstrapModule,
    ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/auth']
      }
    }),
    NgxGalleryModule ,
    FileUploadModule,
    AngularMaterialModule,
    BrowserAnimationsModule ,
    Ng2SearchPipeModule,
    NgxPaginationModule
     
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthService,
    AlertifyService,
    AuthGuard,
    MemberListResolver,
    MemeberDetailResolver,
    // {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig},
    MemberEditResolver,
    PreventUnsavedChangesGuard,
    MessageResolver,
    HasRoleDirective,
    PaymentUsersResolver,
    UserClassShowStudentResolver,
    UserGroupShowStudentResolver,
    UserToAdminResolver,
    UserToAdminDetailsResolver
    
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    InsertUserClassComponent,
    UpdateUserClassComponent,
    UserToAdminUpdateComponent,
    UserToAdminCreateComponent,
    AddUserAttendComponent,
    AddUserExamComponent,
    RolesModalComponent,
    AddUserGroupToClassComponent,
    UserAttendToUpdateComponent,
    UserExamToUpdateComponent,
    UserPayToUpdateComponent


  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
