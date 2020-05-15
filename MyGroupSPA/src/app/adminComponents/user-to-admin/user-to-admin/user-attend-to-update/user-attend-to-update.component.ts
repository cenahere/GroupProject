import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserAttend } from 'src/app/_models/user-attend';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-attend-to-update',
  templateUrl: './user-attend-to-update.component.html',
  styleUrls: ['./user-attend-to-update.component.css']
})
export class UserAttendToUpdateComponent implements OnInit {
  @Output() updateUserAttend = new EventEmitter();
  userAttend:UserAttend;
  model :any = {}



  constructor(private adminService:AdminService,public bsModalRef:BsModalRef  ,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
  }

  updateUserAttendd(userAttend:UserAttend){
    this.adminService.updateUserAttend(userAttend,this.userAttend.userId , this.userAttend.userAttendId ).subscribe(
      res=>{
        this.alertifyService.success("تم اضافة الفصل الدراسي");
        this.updateUserAttend.emit(userAttend);
        this.bsModalRef.hide();
      }
    )
  }

}
