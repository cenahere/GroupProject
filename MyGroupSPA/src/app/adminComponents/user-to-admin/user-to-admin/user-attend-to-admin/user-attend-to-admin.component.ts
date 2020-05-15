import { Component, OnInit, Input } from '@angular/core';
import { UserAttend } from 'src/app/_models/user-attend';
import { UserToAdmin } from 'src/app/_models/user-to-admin';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserAttendToUpdateComponent } from '../user-attend-to-update/user-attend-to-update.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-attend-to-admin',
  templateUrl: './user-attend-to-admin.component.html',
  styleUrls: ['./user-attend-to-admin.component.css']
})
export class UserAttendToAdminComponent implements OnInit {

  @Input() userAttends:UserAttend[]

 term:string;
  p:number=1;
  
  bsModalRef:BsModalRef;
  constructor(private adminService:AdminService,private modalService: BsModalService , private alertifyService:AlertifyService) { }

  ngOnInit(): void {
  }

  deleteAttend(userAttend:UserAttend){
    this.alertifyService.confirm("هل تريد حذف هذا الحضور",()=>{
      this.adminService.deleteUserAttendFromAdmin(userAttend).subscribe(
        ()=>{},
        (error)=>{
          this.userAttends.splice(this.userAttends.findIndex(u=>u.userAttendId==userAttend.userAttendId),1);
          this.alertifyService.success("تم الحذف");
        }
      )
    })
  }

  updateUserAttend(userAttend:UserAttend) {
    const initialState = {
      userAttend

    };
    this.bsModalRef = this.modalService.show(UserAttendToUpdateComponent, {initialState});
    //this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateUserAttend.subscribe(
      (values)=>{
          const newValues={
          new : values
        };
        // this.getUserClasses();
        console.log(newValues)
      }
      )
    }
  
  }
