import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { UserClass } from 'src/app/_models/user-class';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { InsertUserClassComponent } from './insert-user-class/insert-user-class.component';
import { UpdateUserClassComponent } from './update-user-class/update-user-class.component';
import { AddUserGroupToClassComponent } from '../user-group/add-user-group-to-class/add-user-group-to-class.component';

@Component({
  selector: 'app-user-class',
  templateUrl: './user-class.component.html',
  styleUrls: ['./user-class.component.css']
})
export class UserClassComponent implements OnInit {
  userClass:UserClass[]
   p: number = 1;
   term:any;
   bsModalRef: BsModalRef;


  constructor(public adminService:AdminService , public alertifyService:AlertifyService
              , private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUserClasses();
  }
  getUserClasses(){
    return this.adminService.getUsersClasses().subscribe(
      (userClass:UserClass[])=>this.userClass=userClass,
      error=>this.alertifyService.error(error)
    )
  }

  insertUserClass() {
    const initialState = {
      // list: [
      //   'Open a modal with component',
      //   'Pass your data',
      //   'Do something else',
      //   '...'
      // ],
      // title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(InsertUserClassComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.insertNewUserClass.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        this.getUserClasses();
        console.log(newValues);
      }
    )
  }

  updateUserClass(userClass:UserClass) {
    const initialState = {
      userClass
      // list: [
      //   'Open a modal with component',
      //   'Pass your data',
      //   'Do something else',
      //   '...'
      // ],
      // title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(UpdateUserClassComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateThisClass.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        this.getUserClasses();
        console.log(newValues);
      }
    )
  }

  deleteUserClass(userClasss:UserClass){
    this.alertifyService.confirm("هل انت واثق من حذف هذا الفصل الدراسي" , ()=>{
      this.adminService.deleteUserClass(userClasss).subscribe(
        ()=>{
        }, 
        (error)=>{
          try {
            if(userClasss.users != null){
              this.userClass.splice(this.userClass.findIndex(uc=>uc.userClassId==userClasss.userClassId),1);
              this.alertifyService.success("تم حذف الفصل الدراسي");
            }else{
              this.alertifyService.error("خطأ : قد يحتوي هذا الفصل الدراسي علي طلاب ");
            }

          } catch  {
          }

        },

        ()=>{
        }
      )
    })
  }


  addGroupToClass(userClass:UserClass) {
    const initialState = {
      userClass

    };
    this.bsModalRef = this.modalService.show(AddUserGroupToClassComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.addGroupToClasss.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        this.getUserClasses();
        console.log(newValues);
      }
    )
  }}


