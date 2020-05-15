import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserExam } from 'src/app/_models/user-exam';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-user-exam',
  templateUrl: './add-user-exam.component.html',
  styleUrls: ['./add-user-exam.component.css']
})
export class AddUserExamComponent implements OnInit {
  userExam:UserExam;
  user:User;
  model:any={}

  @Output() addUserExam = new EventEmitter();

  evaluationList=[
    {value:'ممتاز' , display : 'ممتاز'},
    {value:'جيد جدا' , display : 'جيد جدا'},
    {value:'جيد', display:'جيد  '},
    {value:'مقبول', display:'مقبول '},
    {value:'ضعيف', display:'ضعيف '}
  ];

  constructor(private adminService:AdminService,private alertifyService:AlertifyService , public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  addUserExamm(){
    this.adminService.addUserExam(this.model, this.user.id).subscribe(
      res=>{
        this.alertifyService.success("تم الاضافة");
        this.addUserExam.emit(this.model);
        this.bsModalRef.hide();

      }
    )
  }


}
