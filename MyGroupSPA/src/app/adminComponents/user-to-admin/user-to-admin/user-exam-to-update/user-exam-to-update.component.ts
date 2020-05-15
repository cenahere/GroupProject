import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserExam } from 'src/app/_models/user-exam';
import { AdminService } from 'src/app/_services/admin.service';
import { BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-user-exam-to-update',
  templateUrl: './user-exam-to-update.component.html',
  styleUrls: ['./user-exam-to-update.component.css']
})
export class UserExamToUpdateComponent implements OnInit {

  @Output() updateUserExam = new EventEmitter();
  userExam:UserExam;
  model :any = {}

  constructor(private adminService:AdminService,public bsModalRef:BsModalRef  ,private alertifyService:AlertifyService) { }
  
  ngOnInit(): void {
  }

  updateUserExamm(userExam:UserExam){
    this.adminService.updateUserExam(userExam,this.userExam.userId , this.userExam.userExamId ).subscribe(
      res=>{
        this.alertifyService.success("تم تعديل الحضور");
        this.updateUserExam.emit(userExam);
        this.bsModalRef.hide();
      }
    )
  }


}
