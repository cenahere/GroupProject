import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserAttend } from 'src/app/_models/user-attend';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { UserGroup } from 'src/app/_models/user-groups';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-user-attend',
  templateUrl: './add-user-attend.component.html',
  styleUrls: ['./add-user-attend.component.css']
})
export class AddUserAttendComponent implements OnInit {
  userAttend:UserAttend;
  user:User;
  model:any={}


  attendList=[
    {value:'حاضر' , display : 'حاضر'},
    {value:'غائب' , display : 'غائب'},
    {value:'معتذر', display:'غائب باذن '},
    {value:'منقظع', display:'منقطع '}
  ];

  @Output() addUserAttendd = new EventEmitter();


  constructor(public bsModalRef: BsModalRef,private adminService:AdminService , private alertifyService:AlertifyService) { }

  ngOnInit(): void {
  }

  addUserAttend(){
    this.adminService.addUserAttend(this.model, this.user.id).subscribe(
      res=>{
        this.alertifyService.success("تم الاضافة");
        this.addUserAttendd.emit(this.model);
        this.bsModalRef.hide();

      }
    )
  }

}
