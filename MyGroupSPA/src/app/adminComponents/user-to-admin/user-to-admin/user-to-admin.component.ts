import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserToAdminCreateComponent } from '../user-to-admin-create/user-to-admin-create.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserToAdminUpdateComponent } from '../user-to-admin-update/user-to-admin-update.component';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/Pagination';
import { UserAttend } from 'src/app/_models/user-attend';
import { AddUserAttendComponent } from '../../userAttend/add-user-attend/add-user-attend.component';
import { AddUserExamComponent } from '../../user-exam/add-user-exam/add-user-exam.component';
import { AddUserPayComponent } from '../../user-pay/add-user-pay/add-user-pay.component';
import { UserGroup } from 'src/app/_models/user-groups';
import { UserClass } from 'src/app/_models/user-class';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-to-admin',
  templateUrl: './user-to-admin.component.html',
  styleUrls: ['./user-to-admin.component.css']
})
export class UserToAdminComponent implements OnInit {
  user : User=JSON.parse(localStorage.getItem('user'));

  users:User[];
  bsModalRef: BsModalRef;
  pagination:Pagination;
  public adminParams:any={}

  userGroups:UserGroup[];
  userClass:UserClass[];


  genderList=[
    {value:'طالب' , display : 'طلاب'},
    {value:'طالبه' , display : 'طالبات'},
  ];

  constructor(public adminService:AdminService ,private route:ActivatedRoute,private modalService: BsModalService, private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    // this.getUserAdmin();

    this.route.data.subscribe(
      data=>{this.users=data['usersToAdmin'].result
      this.pagination=data['usersToAdmin'].pagination;
    }
)
    this.adminParams.gender = this.user.gender === 'طالبه'?'طالبه':'طالبه' ;
    this.adminParams.UserClassName;
    this.adminParams.UserGroupName;

    this.getUserClasses();
    this.getUserGroup();
 }


 getUserAdmin(){
  this.adminService.getUsersToAdmin(this.pagination.currentPage, this.pagination.itemPerPage , this.adminParams).subscribe((res:PaginationResult<User[]>)=>{
     (users:User[])=>{this.users=users}
     this.users=res.result;
     this.pagination=res.pagination;
   },
        error=>this.alertifyService.error(error))
  }
  

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getUserAdmin();
  }


  insertUserByAdmin() {
    const initialState = {

    };
    this.bsModalRef = this.modalService.show(UserToAdminCreateComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.addUserByAdmin.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        this.getUserAdmin();
        console.log(newValues);
      }
    )
  }

  updateUserByAdmin(user:User) {
    const initialState = {
      user
    };
    this.bsModalRef = this.modalService.show(UserToAdminUpdateComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateUserByAdminn.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        this.getUserAdmin();
        console.log(newValues);
      }
    )
  }


  addUserAttend(user:User) {
    const initialState = {
      user
    };
    this.bsModalRef = this.modalService.show(AddUserAttendComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.addUserAttendd.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        // this.getUserAdmin();
        console.log(newValues);
      }
    )
  }

  addUserExam(user:User) {
    const initialState = {
      user
    };
    this.bsModalRef = this.modalService.show(AddUserExamComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.addUserExam.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        // this.getUserAdmin();
        console.log(newValues);
      }
    )
  }

  addUserPay(user:User){
    const initialState={
      user
    };
    this.bsModalRef = this.modalService.show(AddUserPayComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.addUserPayy.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        // this.getUserAdmin();
        console.log(newValues);
      }
    )
  }

  getUserClasses(){
    return this.adminService.getUsersClasses().subscribe(
      (userClass:UserClass[])=>this.userClass=userClass,
      error=>this.alertifyService.error(error)
    )
  }

  getUserGroup(){
    return this.adminService.getUserGroups().subscribe(
      (userGroups:UserGroup[])=>{this.userGroups=userGroups}

    )
  }


}
