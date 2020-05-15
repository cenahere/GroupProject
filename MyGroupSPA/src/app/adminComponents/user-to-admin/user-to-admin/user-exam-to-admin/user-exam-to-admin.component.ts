import { Component, OnInit, Input } from '@angular/core';
import { UserExam } from 'src/app/_models/user-exam';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserExamToUpdateComponent } from '../user-exam-to-update/user-exam-to-update.component';

@Component({
  selector: 'app-user-exam-to-admin',
  templateUrl: './user-exam-to-admin.component.html',
  styleUrls: ['./user-exam-to-admin.component.css']
})
export class UserExamToAdminComponent implements OnInit {

  @Input() userExams:UserExam[];
  term:string;
  p:number=1


  bsModalRef:BsModalRef;
  constructor(private adminService:AdminService,private modalService: BsModalService , private alertifyService:AlertifyService) { }

  
  ngOnInit(): void {
  }
  deleteExam(userExam:UserExam){
    this.alertifyService.confirm("هل تريد حذف هذا الحضور",()=>{
      this.adminService.deleteUserExamFromAdmin(userExam).subscribe(
        ()=>{},
        (error)=>{
          this.userExams.splice(this.userExams.findIndex(u=>u.userExamId==userExam.userExamId),1);
          this.alertifyService.success("تم الحذف");
        }
      )
    })
  }

  updateUserExam(userExam:UserExam) {
    const initialState = {
      userExam

    };
    this.bsModalRef = this.modalService.show(    UserExamToUpdateComponent , {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateUserExam.subscribe(
      (values)=>{
          const newValues={
          new : values
        };

        console.log(newValues)
      }
      )
    }





}
